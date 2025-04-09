import { DiscordModuleOption } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const DiscordConfig: DiscordModuleOption = {
  token: process.env.DISCORD_BOT_TOKEN,
  discordClientOptions: {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
  },
};