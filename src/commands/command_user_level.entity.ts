import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommandUserLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commandId: number;

  @Column('varchar')
  platform: string;

  @Column('varchar')
  userLevel: string;
}
