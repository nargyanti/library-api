import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsNotEmpty } from "class-validator";

export class CreatePenaltyDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    member: number;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ default: new Date() })
    startAt: Date = new Date();

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ default: new Date(new Date().setDate(new Date().getDate() + 3)) })
    endAt?: Date = new Date(new Date().setDate(new Date().getDate() + 3));
}
