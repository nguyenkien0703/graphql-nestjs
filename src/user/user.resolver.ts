import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./models/user.model";
import { CreateUserDto } from "./dto/user.dto";
// bên restful là controler, thì bên graphql là resolver
@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => [User])
    //get ra thì sủ dụng @Query
    async users(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Query(() => User)
    // get detail user thì sử dụng @Query
    async user(@Args("id") id: number): Promise<User> {
        return await this.userService.findOne(Number(id));
    }

    // post, put bên restful thì bên graphql sử dụng @mutation
    @Mutation(() => User)
    async createUser(@Args("userData") userData: CreateUserDto): Promise<User> {
        return await this.userService.create(userData);
    }
}
