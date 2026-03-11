import { IsEmail, IsString } from 'class-validator';

export class CreatePpdbDto {
    @IsString()
    nama: string;

    @IsEmail()
    email: string;

    @IsString()
    kontak: string;

    @IsString()
    asalSekolah: string;
}
