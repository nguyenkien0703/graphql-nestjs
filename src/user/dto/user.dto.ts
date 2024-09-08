import { Field, InputType } from "@nestjs/graphql";
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
