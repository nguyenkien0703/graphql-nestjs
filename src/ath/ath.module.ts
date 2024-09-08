import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AthResolver } from "./ath.resolver";
import { AthService } from "./ath.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    providers: [AthService, AthResolver, PrismaService, JwtService],
})
export class AthModule {}
