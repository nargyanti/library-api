import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) { }

  // Check if the code is unique
  async isCodeUnique(code: string) {
    const member = await this.prisma.member.findUnique({
      where: {
        code: code,
      },
    });

    return !member;
  }

  async create(createMemberDto: CreateMemberDto) {
    // Check if code is unique
    const isCodeUnique = await this.isCodeUnique(createMemberDto.code);
    if (!isCodeUnique) {
      throw new BadRequestException('Code is already taken');
    }

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
    return this.prisma.member.findUnique({ where: { id } });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    // Get member
    const member = await this.prisma.member.findUnique({ where: { id } });

    // Check if code is unique if it is changed
    if (updateMemberDto.code !== member.code) {
      const isCodeUnique = await this.isCodeUnique(updateMemberDto.code);
      if (!isCodeUnique) {
        throw new BadRequestException('Code is already taken');
      }
    }
    return this.prisma.member.update({ where: { id }, data: updateMemberDto });
  }

  remove(id: number) {
    return this.prisma.member.delete({ where: { id } });
  }
}
