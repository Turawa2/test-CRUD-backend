import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Controller('api')
export class SimpleController {
  constructor(private usersService: UsersService) {}

  @Get('test')
  test() {
    return { message: 'Test endpoint works!' };
  }
  
  @Post('register')
  async register(@Body() body: any) {
    // Check if user exists
    const existingUser = await this.usersService.findByEmail(body.email);
    if (existingUser) {
      return { error: 'Email already exists' };
    }
    
    // Hash password before creating user
    const hashedPassword = await this.usersService.hashPassword(body.password || 'temp123');
    
    // Create user
    const user = await this.usersService.create({
      email: body.email,
      username: body.username || body.email.split('@')[0] || 'user',
      password: hashedPassword,
    });
    
    return { 
      message: 'User registered successfully!',
      user: { id: user.id, email: user.email }
    };
  }
}