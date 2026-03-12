

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body:{
            username: string, 
            password: string}) {
        return this.authService.login(
            body.username, 
            body.password
        );
    }

    @Post('register')
    async register(@Body() body:{
            username: string, 
            password: string}) {
        return this.authService.register(
            body.username, 
            body.password
        );
    }
}

// username: kepala sekolah dan operator sekolah
// password: 123456