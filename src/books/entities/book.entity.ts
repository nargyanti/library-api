import { Book } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BookEntity implements Book {
    @ApiProperty()
    id: number;

    @ApiProperty()
    code: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    stock: number;
}
