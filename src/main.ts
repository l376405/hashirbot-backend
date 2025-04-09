import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

// 載入對應的環境變數檔案
const envFilePath = resolve(__dirname, `../.env.${process.env.NODE_ENV}`);
if (existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
} else {
  dotenv.config();
}

export const IS_DEV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const PREFIX = process.env.PREFIX || '/';

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule);
  // 處理程序結束信號
  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}
bootstrap();
