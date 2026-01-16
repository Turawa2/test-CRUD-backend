import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async register(@Body() body: any) {
    const existing = await this.usersService.findByEmail(body.email);
    if (existing) {
      return { error: 'Email already exists' };
    }
    
    // Hash password before creating user
    const hashedPassword = await this.usersService.hashPassword(body.password || 'temp123');
    
    const user = await this.usersService.create({
      email: body.email,
      username: body.username || body.email.split('@')[0] || 'user',
      password: hashedPassword,
    });
    
    return {
      message: 'User created successfully!',
      user: { id: user.id, email: user.email }
    };
  }

  @Get('db-check')
async dbCheck() {
  const dbType = process.env.DB_TYPE || 'unknown';
  const dbHost = process.env.DB_HOST || 'unknown';
  return {
    database: dbType,
    host: dbHost,
    message: 'Database connection check',
    timestamp: new Date()
  };
}

  @Get('test')
  test() {
    return { message: 'API is working!' };
  }
}