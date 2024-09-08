import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dataUser: any): Promise<User> {
        return await this.prisma.user.create({
            data: dataUser,
        });
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async findOne(id: number): Promise<User> {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
}
