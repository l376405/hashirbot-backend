/**
 * @file discord.module.ts
 * @description Discord Bot Module
 * @author HaSHIrosabi
 * @copyright Copyright (c) 2025 HaSHIrosabi
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this project.
 */

// ...existing code...


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