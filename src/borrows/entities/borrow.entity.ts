import { Borrow } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BorrowEntity implements Borrow {
    @ApiProperty()
    id: number;

    @ApiProperty()
    member: number;

    @ApiProperty()
    book: number;

    @ApiProperty()
    borrowedAt: Date;

    @ApiProperty()
    returnedAt: Date;

    @ApiProperty()
    isReturned: boolean;
}
