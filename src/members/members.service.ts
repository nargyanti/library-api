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

  async findOne(id: number) {
    const member = await this.prisma.member.findFirst({
      where: { id },
      include: {
        Borrow: {
          where: {
            isReturned: false,
          },
        },
      },
    });

    const formattedMember = {
      id: member.id,
      code: member.code,
      name: member.name,
      borrowedBooksCount: member.Borrow.length,
    };

    return formattedMember;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.prisma.member.update({ where: { id }, data: updateMemberDto });
  }

  remove(id: number) {
    return this.prisma.member.delete({ where: { id } });
  }
}
