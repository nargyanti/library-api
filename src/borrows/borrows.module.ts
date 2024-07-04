import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BorrowsController],
  providers: [BorrowsService],
  imports: [PrismaModule],
})
export class BorrowsModule { }
