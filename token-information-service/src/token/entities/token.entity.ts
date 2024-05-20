import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  rateLimit: number;

  @Column()
  expiration: Date;
}
