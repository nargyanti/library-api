import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateBorrowDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    member: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    book: number;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ default: new Date() })
    borrowedAt: Date = new Date();

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false, default: null })
    returnedAt?: Date;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false, default: false })
    isReturned?: boolean = false;
}
