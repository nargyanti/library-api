import { ApiProperty } from "@nestjs/swagger";

export class CreateMemberDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;
}
