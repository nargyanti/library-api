import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';

@Module({
  imports: [PrismaModule, MembersModule, BooksModule, BorrowsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
