import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Command } from './command.entity';
import { CommandResponse } from './command_response.entity';
import { CommandUserLevel } from './command_user_level.entity';
import { CommandRegistry } from './command.registry';

@Injectable()
export class CommandService implements OnModuleInit  {
  private commands: Map<string, any> = new Map();

  constructor(
    @InjectRepository(Command)
    private commandRepository: Repository<Command>,
    @InjectRepository(CommandResponse)
    private responseRepository: Repository<CommandResponse>,
    @InjectRepository(CommandUserLevel)
    private userLevelRepository: Repository<CommandUserLevel>,
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
    const dbUserLevels = await this.userLevelRepository.find();

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

      dbUserLevels.filter((level) => level.commandId === cmd.id).forEach((level) => {
        if (!commandData.platforms[level.platform]) {
          commandData.platforms[level.platform] = { response: '', userLevels: [] };
        }
        commandData.platforms[level.platform].userLevels.push(level.userLevel);
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
