import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true }) // No unique constraint
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}