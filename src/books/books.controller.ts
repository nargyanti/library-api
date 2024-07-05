import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
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
  @ApiOkResponse({ type: BookEntity, isArray: true })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  @Patch(':id')
  @ApiOkResponse({ type: BookEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return this.booksService.remove(id);
  }
}
