/**
 * @file discord.config.ts
 * @description Discord Bot Configuration
 * @author HaSHIrosabi
 * @copyright Copyright (c) 2025 HaSHIrosabi
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this project.
 */

// ...existing code...

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