import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength, IsNotEmpty } from "class-validator";

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(4)
    @ApiProperty({ example: 'M001' })
    // TODO: code is unique    
    code: string;

    @IsString()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John Doe' })
    name: string;
}
