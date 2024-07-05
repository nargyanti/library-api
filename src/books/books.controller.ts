import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from './entities/book.entity';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOkResponse({ type: [BookEntity], isArray: true })
  findAll() {
    return this.booksService.findAll();
  }

  @Get('borrowed')
  @ApiOkResponse({ type: [BookEntity], isArray: true })
  findAllLoaned() {
    return this.booksService.findAllLoaned();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BookEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
