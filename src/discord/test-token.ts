import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

async function testToken() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds]
  });

  try {
    console.log('正在測試 Discord Token...');
    await client.login(process.env.DISCORD_BOT_TOKEN);
    console.log('✅ Token 有效！Bot 名稱:', client.user?.tag);
    return true;
  } catch (error) {
    console.error('❌ Token 無效:', error.message);
    return false;
  } finally {
    client.destroy();
  }
}

testToken();