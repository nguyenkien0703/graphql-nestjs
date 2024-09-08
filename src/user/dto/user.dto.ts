import { Field, InputType, Int } from "@nestjs/graphql";
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    Matches,
    MinLength,
} from "class-validator";
@InputType()
export class CreateUserDto {
    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Field(() => String, { nullable: true })
    username?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @Matches(/^[0-9]{10}$/)
    phone?: string;
}

@InputType()
export class UserFilter {
    @Field(() => String, { nullable: true })
    search?: string;
    @Field(() => Int, { nullable: true })
    itemPerPage?: number;
    @Field(() => Int, { nullable: true })
    page?: number;
}

@InputType()
export class UpdateUserDto {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @MinLength(6)
    password?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    username?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @Matches(/^[0-9]{10}$/)
    phone?: string;
}
