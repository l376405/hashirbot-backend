import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { DiscordService } from './discord.service';
import { DiscordConfig } from './discord.config';
import { CommandModule } from '../commands/command.module';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => DiscordConfig,
    }),
    CommandModule,
  ],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordBotModule {}