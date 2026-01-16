import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimpleController } from './simple.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; // KEEP
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'task_manager.db',
      entities: [User],
      synchronize: true,
      logging: true,
    }),

    TypeOrmModule.forFeature([User]),
    UsersModule,
    AuthModule, // AuthController is already in AuthModule
  ],
  controllers: [
    AppController, 
    SimpleController, 
    // REMOVE AuthController from here
  ],
  providers: [AppService],
})
export class AppModule {}