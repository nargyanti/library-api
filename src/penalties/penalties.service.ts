import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PenaltiesService {
  constructor(private prisma: PrismaService) { }

  async create(createPenaltyDto: CreatePenaltyDto) {
    // Check if member is registered
    const member = await this.prisma.member.findUnique({
      where: { id: createPenaltyDto.member },
    });
    if (!member) {
      throw new BadRequestException('Member not found.');
    }

    return this.prisma.penalty.create({ data: createPenaltyDto });
  }

  findAll() {
    return this.prisma.penalty.findMany();
  }

  findOne(id: number) {
    return this.prisma.penalty.findUnique({ where: { id } });
  }

  async update(id: number, updatePenaltyDto: UpdatePenaltyDto) {
    const member = await this.prisma.member.findUnique({
      where: { id: updatePenaltyDto.member },
    });
    if (!member) {
      throw new BadRequestException('Member not found.');
    }
    return this.prisma.penalty.update({ where: { id }, data: updatePenaltyDto });
  }

  remove(id: number) {
    return this.prisma.penalty.delete({ where: { id } });
  }
}
