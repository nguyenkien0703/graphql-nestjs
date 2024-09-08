import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { User } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { LoginResponse } from "./models/auth.models";
@Injectable()
export class AthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(userData: RegisterDto): Promise<User> {
        const {} = userData;
        const user = await this.prismaService.user.findUnique({
            where: {
                email: userData.email,
            },
        });
        if (user) {
            throw new HttpException(
                "Email already exists",
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashPassword = await hash(userData.password, 10);
        const result = await this.prismaService.user.create({
            data: {
                ...userData,
                password: hashPassword,
            },
        });
        return result;
    }

    async login(userData: LoginDto): Promise<LoginResponse> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: userData.email,
            },
        });

        if (!user) {
            throw new HttpException(
                "Account not found",
                HttpStatus.BAD_REQUEST,
            );
        }
        const verifyPassword = await compare(userData.password, user.password);
        if (!verifyPassword) {
            throw new HttpException(
                "Password is incorrect",
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = {
            id: user.id,
            email: user.email,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: 60,
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: "7d",
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
