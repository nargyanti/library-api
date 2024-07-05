import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) { }

  create(createMemberDto: CreateMemberDto) {
    return this.prisma.member.create({ data: createMemberDto });
  }

  // Get all members with borrowed books count
  async findAll() {
    const members = await this.prisma.member.findMany({
      include: {
        Borrow: {
          where: {
            isReturned: false,
          },
        },
      },
    });

    const formattedMembers = members.map(member => ({
      id: member.id,
      code: member.code,
      name: member.name,
      borrowedBooksCount: member.Borrow.length,
    }));

    return formattedMembers;
  }

  // Get member by id with borrowed books details
  findOne(id: number) {
    return this.prisma.member.findUnique({
      where: { id },
      include: {
        Borrow: {
          where: {
            isReturned: false,
          },
          include: {
            Book: true,
          }
        },
      },
    });
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.prisma.member.update({ where: { id }, data: updateMemberDto });
  }

  remove(id: number) {
    return this.prisma.member.delete({ where: { id } });
  }
}
