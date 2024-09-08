import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UpdateUserDto, UserFilter } from "./dto/user.dto";
import { UserPaginationResponse } from "./models/user.model";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dataUser: any): Promise<User> {
        return await this.prisma.user.create({
            data: dataUser,
        });
    }

    async findAll(filter: UserFilter): Promise<UserPaginationResponse> {
        const search = filter.search || "";
        const itemPerPage = Number(filter.itemPerPage) || 10;
        const page = Number(filter.page) || 1;

        const skip = page > 1 ? (page - 1) * itemPerPage : 0;

        const users = await this.prisma.user.findMany({
            take: itemPerPage,
            skip: skip,
            where: {
                OR: [
                    {
                        username: {
                            contains: search,
                        },
                    },
                    {
                        email: {
                            contains: search,
                        },
                    },
                ],
            },
        });
        const total = await this.prisma.user.count({
            where: {
                OR: [
                    {
                        username: {
                            contains: filter.search,
                        },
                    },
                    {
                        email: {
                            contains: filter.search,
                        },
                    },
                ],
            },
        });

        return {
            data: users,
            total,
            currentPage: page,
            itemPerPage,
        };
    }

    async findOne(id: number): Promise<User> {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: number, dataUpdate: UpdateUserDto): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                id,
            },
        });
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return this.prisma.user.update({
            where: {
                id,
            },
            data: dataUpdate,
        });
    }

    async delete(id: number): Promise<boolean> {
        const user = await this.prisma.user.findFirst({
            where: {
                id,
            },
        });
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        try {
            await this.prisma.user.delete({
                where: {
                    id,
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
