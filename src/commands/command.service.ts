/**
 * @file command.service.ts
 * @description 指令服務，負責處理指令的執行和回應，載入及新增修改指令
 * @author HaSHIrosabi
 * @copyright Copyright (c) 2025 HaSHIrosabi
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this project.
 */

// ...existing code...

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Command } from './command.entity';
import { CommandResponse } from './command_response.entity';
import { CommandRegistry } from './command.registry';

@Injectable()
export class CommandService implements OnModuleInit  {
  private commands: Map<string, any> = new Map();

  constructor(
    @InjectRepository(Command)
    private commandRepository: Repository<Command>,
    @InjectRepository(CommandResponse)
    private responseRepository: Repository<CommandResponse>
  ) {}

  async onModuleInit() {
    // 載入註冊的指令
    this.loadRegisteredCommands();
    // 載入資料庫指令
    await this.loadCommandsFromDatabase();
  }

  private loadRegisteredCommands() {
    CommandRegistry.forEach(command => {
      this.commands.set(command.name.toLowerCase(), {
        name: command.name,
        defaultResponse: '',
        cooldown: 0,
        replyToSender: true,
        triggerMethod: 'exact',
        triggerParameter: command.name,
        aliases: [],
        platforms: {
          discord: { response: command.getResponse('discord'), userLevels: [] },
          twitch: { response: command.getResponse('twitch'), userLevels: [] }
        }
      });
    });
  }

  async loadCommandsFromDatabase(): Promise<void> {
    const dbCommands = await this.commandRepository.find();
    const dbResponses = await this.responseRepository.find();

    dbCommands.forEach((cmd) => {
      const commandData = {
        name: cmd.name,
        defaultResponse: cmd.defaultResponse,
        cooldown: cmd.cooldown,
        replyToSender: cmd.replyToSender,
        triggerMethod: cmd.triggerMethod,
        triggerParameter: cmd.triggerParameter,
        aliases: cmd.aliases || [],
        platforms: {},
      };

      dbResponses.filter((res) => res.commandId === cmd.id).forEach((res) => {
        if (!commandData.platforms[res.platform]) {
          commandData.platforms[res.platform] = { response: '', userLevels: [] };
        }
        commandData.platforms[res.platform].response = res.response;
      });

      this.commands.set(cmd.name, commandData);
      cmd.aliases?.forEach((alias) => this.commands.set(alias, commandData));
    });
    
    console.log('✅ 指令已載入');
  }

  async createCommand(commandData: Partial<Command>): Promise<string> {
    try {
      const newCommand = this.commandRepository.create(commandData);
      await this.commandRepository.save(newCommand);

      this.commands.set(newCommand.name, {
        name: newCommand.name,
        defaultResponse: newCommand.defaultResponse,
        cooldown: newCommand.cooldown,
        replyToSender: newCommand.replyToSender,
        triggerMethod: newCommand.triggerMethod,
        triggerParameter: newCommand.triggerParameter,
        aliases: newCommand.aliases || [],
        platforms: {},
      });

      return `✅ 新增指令 "${newCommand.name}" 成功！`;
    } catch (err) {
      console.error('❌ createCommand 失敗', err);
      return '❌ 新增指令時發生錯誤';
    }
  }

  async updateCommand(commandName: string, updatedData: Partial<Command>): Promise<string> {
    const existingCommand = await this.commandRepository.findOne({ where: { name: commandName } });

    if (!existingCommand) return `❌ 指令 "${commandName}" 不存在！`;

    Object.assign(existingCommand, updatedData);

    await this.commandRepository.save(existingCommand);

    return `✅ 指令 "${commandName}" 已更新！`;
  }

  async executeCommand(platform: 'discord' | 'twitch', message: string): Promise<string> {
    const prefix = '!'; 
    let commandName = message.startsWith(prefix) ? message.slice(prefix.length).trim().toLowerCase() : null;
    
    if (!commandName) return null;

    let matchedCommand = null;

    // 檢查註冊的指令和資料庫指令
    for (const [name, command] of this.commands.entries()) {
      if (command.triggerMethod === 'exact' && name === commandName) {
        matchedCommand = command;
        break;
      } else if (command.triggerMethod === 'match' && message.includes(command.triggerParameter)) {
        matchedCommand = command;
        break;
      } else if (command.triggerMethod === 'regex') {
        const regex = new RegExp(command.triggerParameter);
        if (regex.test(message)) {
          matchedCommand = command;
          break;
        }
      }
    }

    if (!matchedCommand) return `❌ 指令 "${commandName}" 不存在！`;

    const platformData = matchedCommand.platforms[platform];
    
    if (!platformData) return `❌ 指令 "${commandName}" 不支援平台 "${platform}"`;

    return platformData.response || matchedCommand.defaultResponse;
  }
}
