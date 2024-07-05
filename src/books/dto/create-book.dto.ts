import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, MinLength, MaxLength, IsNotEmpty, Min } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(6)
    @ApiProperty({ example: 'SHY-01' })
    // TODO: code is unique    
    code: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'The Secret' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Rhonda Byrne' })
    author: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @ApiProperty({ default: 1 })
    stock: number;
}
