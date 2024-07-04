import { Penalty } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PenaltyEntity implements Penalty {
    @ApiProperty()
    id: number;

    @ApiProperty()
    member: number;

    @ApiProperty()
    startAt: Date;

    @ApiProperty()
    endAt: Date;
}
