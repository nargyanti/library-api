import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) { }

  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({ data: createBookDto });
  }

  async findAll() {
    const borrowedBooks = await this.prisma.borrow.groupBy({
      by: ['book'],
      where: {
        isReturned: false
      },
      _count: true
    });

    const books = await this.prisma.book.findMany();

    const borrowedCounts = borrowedBooks.reduce((acc, curr) => ({
      ...acc,
      [curr.book]: curr._count
    }), {});

    return books.map(book => ({
      ...book,
      stock: book.stock - (borrowedCounts[book.id] || 0)
    }));
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
