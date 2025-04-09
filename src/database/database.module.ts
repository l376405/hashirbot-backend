import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // 使用 ConfigModule 加載 .env 文件中的環境變數
    ConfigModule.forRoot({
      isGlobal: true, // 確保 ConfigModule 在整個應用中可用
    }),
    // 配置 TypeORM 資料庫連線
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD') || '', // 密碼留空時默認為空字串
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // 掃描所有實體檔案
        synchronize: configService.get<string>('NODE_ENV') === 'development', // 僅在開發環境啟用同步
      }),
    }),
  ],
})
export class DatabaseModule {}