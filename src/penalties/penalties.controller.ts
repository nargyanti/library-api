import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { PenaltiesService } from './penalties.service';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PenaltyEntity } from './entities/penalty.entity';

@Controller('penalties')
@ApiTags('penalties')
export class PenaltiesController {
  constructor(private readonly penaltiesService: PenaltiesService) { }

  @Post()
  @ApiCreatedResponse({ type: PenaltyEntity })
  create(@Body() createPenaltyDto: CreatePenaltyDto) {
    return this.penaltiesService.create(createPenaltyDto);
  }

  @Get()
  @ApiOkResponse({ type: [PenaltyEntity], isArray: true })
  findAll() {
    return this.penaltiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PenaltyEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const penalty = await this.penaltiesService.findOne(id);
    if (!penalty) {
      throw new NotFoundException(`Penalty with id ${id} not found`);
    }
    return penalty;
  }

  @Patch(':id')
  @ApiOkResponse({ type: PenaltyEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePenaltyDto: UpdatePenaltyDto) {
    const penalty = await this.penaltiesService.findOne(id);
    if (!penalty) {
      throw new NotFoundException(`Penalty with id ${id} not found`);
    }

    return this.penaltiesService.update(id, updatePenaltyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PenaltyEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const penalty = await this.penaltiesService.findOne(id);
    if (!penalty) {
      throw new NotFoundException(`Penalty with id ${id} not found`);
    }

    return this.penaltiesService.remove(id);
  }
}
