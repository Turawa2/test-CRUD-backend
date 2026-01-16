import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimpleController } from './simple.controller';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // SQLite configuration - WORKS 100%
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'task_manager.db',
      entities: [User],
      synchronize: true, // Auto-create tables
      logging: true,
    }),

    // Feature modules
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  controllers: [AppController, SimpleController],
  providers: [AppService],
})
export class AppModule {}