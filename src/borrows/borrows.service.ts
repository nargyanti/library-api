import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BorrowsService {
  constructor(private prisma: PrismaService) { }

  async create(createBorrowDto: CreateBorrowDto) {
    // Get if book is available for borrowing
    const book = await this.prisma.book.findUnique({
      where: { id: createBorrowDto.book },
    });

    if (!book || book.stock <= 0) {
      throw new BadRequestException('Book is not available for borrowing.');
    }

    const isPenalized = await this.prisma.penalty.findFirst({
      where: {
        member: createBorrowDto.member,
        endAt: {
          gt: new Date()
        }
      }
    });
    if (isPenalized) {
      throw new BadRequestException("Member is penalized until " + isPenalized.endAt);
    }

    // Check if member has reached maximum borrow limit
    const borrowCount = await this.prisma.borrow.count({
      where: {
        member: createBorrowDto.member,
        isReturned: false,
      }
    });
    if (borrowCount + 1 > 2) {
      throw new BadRequestException("Member cannot borrow more than 2 books");
    }

    // Check if book is borrowed by another member
    const isBookBorrowed = await this.prisma.borrow.findFirst({
      where: {
        book: createBorrowDto.book,
        isReturned: false
      },
    });
    if (isBookBorrowed) {
      throw new BadRequestException('Book is already borrowed by another member.');
    }


    return await this.prisma.borrow.create({
      data: createBorrowDto,
    });
  }

  findAll() {
    return this.prisma.borrow.findMany();
  }

  findOne(id: number) {
    return this.prisma.borrow.findUnique({ where: { id } });
  }

  async update(id: number, updateBorrowDto: UpdateBorrowDto) {
    // if return date is set, update the book stock
    if (updateBorrowDto.returnedAt) {
      const borrow = await this.prisma.borrow.findUnique({ where: { id } });
      if (!borrow) {
        throw new BadRequestException('Borrow not found.');
      }

      const book = await this.prisma.book.findUnique({ where: { id: updateBorrowDto.book } });
      if (!book) {
        throw new BadRequestException('Book not found.');
      }

      // if returnedAt is set, change isReturned to true
      const returnedBook = this.prisma.borrow.update({
        where: { id },
        data: { ...updateBorrowDto, isReturned: true },
      });

      // if book is returned more than 7 days from borrowedAt, create penalty record      
      const borrowedAt = new Date(borrow.borrowedAt);
      const returnedAt = new Date(updateBorrowDto.returnedAt);
      const diffTime = Math.abs(returnedAt.getTime() - borrowedAt.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 7) {
        await this.prisma.penalty.create({
          data: {
            member: borrow.member,
            startAt: new Date(),
            endAt: new Date(new Date().setDate(new Date().getDate() + 3)),
          }
        });
      }

      return returnedBook;
    } else {
      return this.prisma.borrow.update({ where: { id }, data: updateBorrowDto });
    }
  }

  remove(id: number) {
    return this.prisma.borrow.delete({ where: { id } });
  }
}
