import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) { }

  // Check if the code is unique
  async isCodeUnique(code: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        code: code,
      },
    });

    return !book;
  }

  async create(createBookDto: CreateBookDto) {
    const isCodeUnique = await this.isCodeUnique(createBookDto.code);
    if (!isCodeUnique) {
      throw new BadRequestException('Code is already taken');
    }

    return this.prisma.book.create({ data: createBookDto });
  }

  // Get all books with available stock
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

  async findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    // Get book
    const book = await this.prisma.book.findUnique({ where: { id } });

    // Check if code is unique if it is changed
    if (updateBookDto.code !== book.code) {
      const isCodeUnique = await this.isCodeUnique(updateBookDto.code);
      if (!isCodeUnique) {
        throw new BadRequestException('Code is already taken');
      }
    }

    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
