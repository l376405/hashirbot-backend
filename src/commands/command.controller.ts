/**
 * @file command.controller.ts
 * @description 指令控制器，負責處理指令相關的 HTTP 請求
 * @author HaSHIrosabi
 * @copyright Copyright (c) 2025 HaSHIrosabi
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this project.
 */

// ...existing code...

import { Controller, Post, Body } from '@nestjs/common';
import { CommandService } from './command.service';
import { Command } from './command.entity'; // 显式导入 Command 类型

@Controller('commands')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post('create')
  async createCommand(
    @Body()
    {
      name,
      defaultResponse,
      cooldown,
      replyToSender,
      triggerMethod,
      triggerParameter,
      aliases,
    }: {
      name: string;
      defaultResponse: string;
      cooldown?: number;
      replyToSender?: boolean;
      triggerMethod?: string;
      triggerParameter?: string;
      aliases?: string[];
    },
  ) {
    return this.commandService.createCommand({
      name,
      defaultResponse,
      cooldown,
      replyToSender,
      triggerMethod,
      triggerParameter,
      aliases,
    });
  }

  @Post('update')
  async updateCommand(
    @Body()
    { commandName, updatedData }: { commandName: string; updatedData: Partial<Command> },
  ) {
    return this.commandService.updateCommand(commandName, updatedData);
  }
}
