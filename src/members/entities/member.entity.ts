import { Member } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MemberEntity implements Member {
    @ApiProperty()
    id: number;

    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;
}