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

  @Post('login') // SIMPLE VERSION
  async login(@Body() body: any) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const isPasswordValid = await this.usersService.comparePasswords(
      body.password,
      user.password,
    );
    
    if (!isPasswordValid) {
      return { error: 'Invalid credentials' };
    }

    // Simple response without JWT for now
    const { password, ...userWithoutPassword } = user;
    return {
      message: 'Login successful',
      user: userWithoutPassword,
      token: 'jwt-will-be-added-later' // Placeholder
    };
  }

  @Get('db-check')
  async dbCheck() {
    const dbHost = process.env.DB_HOST || 'sqlite';
    return {
      database: 'sqlite',
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