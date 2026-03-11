import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateActivityDto {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    date?: string;
}