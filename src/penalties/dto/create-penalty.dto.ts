import { ApiProperty } from '@nestjs/swagger';

export class CreatePenaltyDto {
    @ApiProperty()
    member: number;

    @ApiProperty()
    startAt: Date;

    @ApiProperty()
    endAt: Date;
}
