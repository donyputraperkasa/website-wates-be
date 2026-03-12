import { IsString, IsOptional } from 'class-validator';

export class CreateActivityDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image?: string;

}