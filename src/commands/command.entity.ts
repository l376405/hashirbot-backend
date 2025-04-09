import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // 指令名稱 (!hello, !ping)

  @Column('text')
  defaultResponse: string; // 預設回應

  @Column('int', { default: 0 })
  cooldown: number; // 冷卻時間（秒）

  @Column('boolean', { default: false })
  replyToSender: boolean; // 是否回覆發訊息者

  @Column('varchar', { default: 'exact' })
  triggerMethod: string; // 觸發方式 (exact, match, regex)

  @Column('text', { default: '' })
  triggerParameter: string; // 觸發參數 (exact: 指令名稱, match: 正則表達式, regex: 正則表達式)

  @Column('text', { array: true, default: () => "'{}'" })
  aliases: string[]; // 指令別名

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}