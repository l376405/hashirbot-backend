/**
 * @file app.module.ts
 * @description Main application module
 * @author HaSHIrosabi
 * @copyright Copyright (c) 2025 HaSHIrosabi
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this project.
 */

// ...existing code...

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordBotModule } from './discord/discord.module';
import { CommandModule } from './commands/command.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // 確保設為全域
      envFilePath: '.env',
      cache: true,
    }),
    CommandModule,  // 確保 CommandModule 在這裡導入
    DiscordBotModule, // 確保 DiscordBotModule 在這裡導入
    DatabaseModule, // 確保 DatabaseModule 在這裡導入
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}