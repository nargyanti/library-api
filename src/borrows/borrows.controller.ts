import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BorrowEntity } from './entities/borrow.entity';

@Controller('borrows')
@ApiTags('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) { }

  @Post()
  @ApiCreatedResponse({ type: BorrowEntity })
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowsService.create(createBorrowDto);
  }

  @Get()
  @ApiOkResponse({ type: [BorrowEntity], isArray: true })
  findAll() {
    return this.borrowsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BorrowEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const borrow = await this.borrowsService.findOne(id);
    if (!borrow) {
      throw new NotFoundException(`Borrow with id ${id} not found`);
    }
    return borrow;
  }

  @Patch(':id')
  @ApiOkResponse({ type: BorrowEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBorrowDto: UpdateBorrowDto) {
    const borrow = await this.borrowsService.findOne(id);
    if (!borrow) {
      throw new NotFoundException(`Borrow with id ${id} not found`);
    }

    return this.borrowsService.update(id, updateBorrowDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BorrowEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const borrow = await this.borrowsService.findOne(id);
    if (!borrow) {
      throw new NotFoundException(`Borrow with id ${id} not found`);
    }

    return this.borrowsService.remove(id);
  }
}
