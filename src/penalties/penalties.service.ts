import { Injectable } from '@nestjs/common';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PenaltiesService {
  constructor(private prisma: PrismaService) { }

  create(createPenaltyDto: CreatePenaltyDto) {
    return this.prisma.penalty.create({ data: createPenaltyDto });
  }

  findAll() {
    return this.prisma.penalty.findMany();
  }

  findOne(id: number) {
    return this.prisma.penalty.findUnique({ where: { id } });
  }

  update(id: number, updatePenaltyDto: UpdatePenaltyDto) {
    return this.prisma.penalty.update({ where: { id }, data: updatePenaltyDto });
  }

  remove(id: number) {
    return this.prisma.penalty.delete({ where: { id } });
  }
}
