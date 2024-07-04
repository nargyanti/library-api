import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  @ApiOkResponse({ type: [MemberEntity], isArray: true })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MemberEntity })
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: MemberEntity })
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: MemberEntity })
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
