import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.borrowsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BorrowEntity })
  update(@Param('id') id: string, @Body() updateBorrowDto: UpdateBorrowDto) {
    return this.borrowsService.update(+id, updateBorrowDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BorrowEntity })
  remove(@Param('id') id: string) {
    return this.borrowsService.remove(+id);
  }
}
