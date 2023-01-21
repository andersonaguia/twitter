import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateTweetDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(280)
    readonly tweet: string;

    @IsNotEmpty()
    @IsNumber()
    readonly user: number;
}