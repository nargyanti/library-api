import { Module } from '@nestjs/common';
import { PenaltiesService } from './penalties.service';
import { PenaltiesController } from './penalties.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PenaltiesController],
  providers: [PenaltiesService],
  imports: [PrismaModule],
})
export class PenaltiesModule { }
