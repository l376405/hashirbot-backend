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
    this.logger.log(`🤖 Discord Bot 已啟動: ${this.client.user.tag}`);
    this.logger.log(`🔗 連接到伺服器: ${this.client.guilds.cache.map(guild => guild.name).join(', ')}`)
  }

  @On('messageCreate')
  async onMessage(message: Message) {
    if (message.author.bot) return;

    try {
      const response = await this.commandService.executeCommand('discord', message.content);
      const displayName = message.member?.displayName || message.author.username;
      this.logger.debug(`🤖訊息發送者: ${displayName} ，🔍 訊息內容: ${message.content}`);
      this.logger.debug(`🔍 指令執行結果: ${response}`);

      if (response) {
        message.reply(response);
      }
    } catch (error) {
      this.logger.error('❌ 指令執行錯誤:', error);
    }
  }
}
