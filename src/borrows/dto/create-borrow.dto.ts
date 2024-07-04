import { ApiProperty } from "@nestjs/swagger";

export class CreateBorrowDto {
    @ApiProperty()
    member: number;

    @ApiProperty()
    book: number;

    @ApiProperty()
    borrowedAt: Date;
}
