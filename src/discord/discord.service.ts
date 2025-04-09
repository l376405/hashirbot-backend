import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDiscordClient, Once, On } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';
import { CommandService } from '../commands/command.service';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly configService: ConfigService,
    private readonly commandService: CommandService,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log('✅ Discord Bot 已啟動');
  }

  @On('messageCreate')
  async onMessage(message: Message) {
    if (message.author.bot) return;

    try {
      const response = await this.commandService.executeCommand('discord', message.content);
      this.logger.debug(`🔍 指令執行結果: ${response}`);

      if (response) {
        message.reply(response);
      }
    } catch (error) {
      this.logger.error('❌ 指令執行錯誤:', error);
    }
  }
}
