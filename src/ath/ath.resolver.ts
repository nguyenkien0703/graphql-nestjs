import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "src/user/models/user.model";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { AthService } from "./ath.service";
import { LoginResponse } from "./models/auth.models";

@Resolver()
export class AthResolver {
    constructor(private athService: AthService) {}

    @Mutation(() => User)
    async register(@Args("userData") userData: RegisterDto): Promise<User> {
        return await this.athService.register(userData);
    }

    @Mutation(() => LoginResponse)
    async login(@Args("userData") userData: LoginDto): Promise<LoginResponse> {
        return await this.athService.login(userData);
    }
}
