import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        // console.log(
        //     "ctx.getContext().req----",
        //     ctx.getContext().req.headers.authorization,
        // );
        const token = this.extractToken(ctx.getContext().req);
        if (!token) {
            throw new UnauthorizedException("Unauthorized access");
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.ACCESS_TOKEN_SECRET,
            });
            return true;
        } catch (error) {
            console.log(error);
            throw new HttpException("inalid token", HttpStatus.UNAUTHORIZED);
        }

        return true;
    }

    private extractToken(req: any): string | undefined {
        const [type, token] = req.headers.authorization
            ? req.headers.authorization.split(" ")
            : [];
        return type === "Bearer" ? token : undefined;
    }
}
