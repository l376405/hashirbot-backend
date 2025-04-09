import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordBotModule } from './discord/discord.module';
import { CommandModule } from './commands/command.module';
import { DatabaseModule } from './database/database.module';

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
})
export class AppModule {}