import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommandResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commandId: number;

  @Column('varchar')
  platform: string;

  @Column('text')
  response: string;
}
