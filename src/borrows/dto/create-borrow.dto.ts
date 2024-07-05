import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateBorrowDto {
    // TODO: validation for member is exist
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    member: number;

    // TODO: validation for book is exist
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
