/**
 * @file discord.service.spec.ts
 * @description Discord Service Unit Test
 * @author HaSHIrosabi
 * @copyright Copyright (c) 2025 HaSHIrosabi
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this project.
 */

// ...existing code...

import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { ConfigService } from '@nestjs/config';
import { CommandService } from '../commands/command.service';
import { Client, Message, User } from 'discord.js';
import { Logger } from '@nestjs/common';

// 模擬 @discord-nestjs/core 裝飾器
jest.mock('@discord-nestjs/core', () => ({
  InjectDiscordClient: () => jest.fn(),
  Once: () => jest.fn(),
  On: () => jest.fn(),
}));

describe('DiscordService', () => {
  let service: DiscordService;
  let mockClient: jest.Mocked<Partial<Client>>;
  let mockConfigService: jest.Mocked<Partial<ConfigService>>;
  let mockCommandService: jest.Mocked<Partial<CommandService>>;
  let mockMessage: Message;

  beforeEach(async () => {
    // 建立模擬的 Discord Client
    mockClient = {
      user: { tag: 'TestBot#0000' },
    } as jest.Mocked<Partial<Client>>;

    // 建立模擬的 ConfigService
    mockConfigService = {
      get: jest.fn(),
    } as jest.Mocked<Partial<ConfigService>>;

    // 建立模擬的 CommandService
    mockCommandService = {
      executeCommand: jest.fn(),
    } as jest.Mocked<Partial<CommandService>>;

    // 建立完整的 Message 模擬物件
    mockMessage = {
      author: {
        bot: false,
        id: '123456789',
        username: 'TestUser',
        _equals: jest.fn(),
        fetch: jest.fn(),
        send: jest.fn(),
        toString: jest.fn(),
        createDM: jest.fn(),
        deleteDM: jest.fn(),
        client: mockClient,
      } as unknown as User,
      content: '!test',
      reply: jest.fn().mockResolvedValue(undefined),
      _patch: jest.fn(),
      _cacheType: null,
      client: mockClient,
    } as unknown as Message;

    // 建立測試模組
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscordService,
        {
          provide: Client, // 模擬 Client 的注入
          useValue: mockClient,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: CommandService,
          useValue: mockCommandService,
        },
      ],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('應該正確初始化服務', () => {
    expect(service).toBeDefined();
    expect(service['client']).toBeDefined();
    expect(service['configService']).toBeDefined();
    expect(service['commandService']).toBeDefined();
  });

  describe('onReady', () => {
    it('應該記錄機器人啟動訊息', () => {
      const logSpy = jest.spyOn(service['logger'], 'log');
      service.onReady();
      expect(logSpy).toHaveBeenCalledWith('🤖 Discord Bot 已啟動: TestBot#0000');
    });
  });

  describe('onMessage', () => {
    describe('當收到機器人訊息時', () => {
      it('應該忽略機器人的訊息', async () => {
        mockMessage.author.bot = true;
        await service.onMessage(mockMessage);
        expect(mockCommandService.executeCommand).not.toHaveBeenCalled();
      });
    });

    describe('當收到使用者訊息時', () => {
      beforeEach(() => {
        mockMessage.author.bot = false;
      });

      it('應該執行指令並回覆成功結果', async () => {
        const expectedResponse = '測試回應';
        mockCommandService.executeCommand.mockResolvedValueOnce(expectedResponse);
        const debugSpy = jest.spyOn(service['logger'], 'debug');

        await service.onMessage(mockMessage);

        expect(mockCommandService.executeCommand).toHaveBeenCalledWith('discord', '!test');
        expect(mockMessage.reply).toHaveBeenCalledWith(expectedResponse);
        expect(debugSpy).toHaveBeenCalledWith(`🔍 指令執行結果: ${expectedResponse}`);
      });

      it('不應該回覆空回應', async () => {
        mockCommandService.executeCommand.mockResolvedValueOnce('');
        await service.onMessage(mockMessage);
        expect(mockMessage.reply).not.toHaveBeenCalled();
      });

      it('應該正確處理錯誤', async () => {
        const testError = new Error('測試錯誤');
        mockCommandService.executeCommand.mockRejectedValueOnce(testError);
        const errorSpy = jest.spyOn(service['logger'], 'error');

        await service.onMessage(mockMessage);

        expect(errorSpy).toHaveBeenCalledWith('❌ 指令執行錯誤:', testError);
        expect(mockMessage.reply).not.toHaveBeenCalled();
      });
    });
  });
});