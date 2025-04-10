import { GatewayIntentBits } from 'discord.js';
import { DiscordModuleOption } from '@discord-nestjs/core';

// filepath: src/discord/discord.config.test.ts

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('DiscordConfig', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.DISCORD_BOT_TOKEN = 'test-token';
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should load Discord configuration with correct token', async () => {
    const { DiscordConfig } = await import('./discord.config');
    expect(DiscordConfig.token).toBe('test-token');
  });

  it('should have correct intents configuration', async () => {
    const { DiscordConfig } = await import('./discord.config');
    
    const expectedIntents = [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ];

    expect(DiscordConfig.discordClientOptions.intents).toEqual(expectedIntents);
  });

  it('should match DiscordModuleOption interface', async () => {
    const { DiscordConfig } = await import('./discord.config');
    
    expect(DiscordConfig).toHaveProperty('token');
    expect(DiscordConfig).toHaveProperty('discordClientOptions');
    expect(DiscordConfig.discordClientOptions).toHaveProperty('intents');
  });

  it('should throw error when DISCORD_BOT_TOKEN is not set', async () => {
    delete process.env.DISCORD_BOT_TOKEN;
    const { DiscordConfig } = await import('./discord.config');
    expect(DiscordConfig.token).toBeUndefined();
  });
});