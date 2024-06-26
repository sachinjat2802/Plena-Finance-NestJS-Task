import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  rateLimit?: number;

  @Column()
  expiration?: Date;

  @Column({ default: true })
  isActive: boolean;
}
