import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User, UserPaginationResponse } from "./models/user.model";
import { CreateUserDto, UpdateUserDto, UserFilter } from "./dto/user.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/ath/auth.guard";
// bên restful là controler, thì bên graphql là resolver
@UseGuards(AuthGuard)
@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    // @Query(() => [User])// old version
    @Query(() => UserPaginationResponse) // new version after add search
    //get ra thì sủ dụng @Query
    // @UseGuards(AuthGuard)
    async users(
        @Args("filter") filter: UserFilter,
    ): Promise<UserPaginationResponse> {
        return await this.userService.findAll(filter);
    }

    @Query(() => User)
    // get detail user thì sử dụng @Query
    // @UseGuards(AuthGuard)
    async user(@Args("id") id: number): Promise<User> {
        return await this.userService.findOne(Number(id));
    }

    // post, put bên restful thì bên graphql sử dụng @mutation
    @Mutation(() => User)
    async createUser(@Args("userData") userData: CreateUserDto): Promise<User> {
        return await this.userService.create(userData);
    }

    @Mutation(() => User)
    async updateUser(
        @Args("id") id: number,
        @Args("userData") dataUpdate: UpdateUserDto,
    ): Promise<User> {
        return await this.userService.update(id, dataUpdate);
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args("id") id: number): Promise<boolean> {
        return await this.userService.delete(id);
    }
}
