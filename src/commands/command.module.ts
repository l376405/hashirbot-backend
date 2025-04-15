import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandService } from './command.service';
import { Command } from './command.entity';
import { CommandResponse } from './command_response.entity';
import { CommandUserLevel } from './command_user_level.entity';
import { CommandController } from './command.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Command,
      CommandResponse,
      CommandUserLevel
    ]),
  ],
  controllers: [CommandController],
  providers: [CommandService],
  exports: [CommandService],
})
export class CommandModule {}