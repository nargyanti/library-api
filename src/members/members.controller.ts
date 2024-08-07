import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MemberEntity } from './entities/member.entity';

@Controller('members')
@ApiTags('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Post()
  @ApiCreatedResponse({ type: MemberEntity })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOkResponse({ type: MemberEntity, isArray: true })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MemberEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const member = await this.membersService.findOne(id);
    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }
    return member;
  }

  @Patch(':id')
  @ApiOkResponse({ type: MemberEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateMemberDto: UpdateMemberDto) {
    const member = await this.membersService.findOne(id);
    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }

    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: MemberEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const member = await this.membersService.findOne(id);
    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }
    return this.membersService.remove(id);
  }
}
