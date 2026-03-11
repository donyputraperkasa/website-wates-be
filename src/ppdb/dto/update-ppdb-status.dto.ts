import { IsString } from 'class-validator';

export class UpdatePpdbStatusDto {
    @IsString()
    status: string;
}
