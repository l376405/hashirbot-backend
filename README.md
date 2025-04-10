<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# HashirBot 後端服務

<p align="center">一個基於 <a href="http://nestjs.com" target="_blank">NestJS</a>、<a href="https://discord.js.org/" target="_blank">Discord.js</a> 和 <a href="https://twurple.js.org/" target="_blank">Twurple</a> 的 Discord 和 Twitch 聊天機器人後端服務。</p>

<p align="center">
  <a href="https://github.com/l376405/hashirbot-backend/actions/workflows/ci.yml" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/l376405/hashirbot-backend/ci.yml?branch=main" alt="CI 狀態" /></a>
  <a href="https://github.com/l376405/hashirbot-backend" target="_blank"><img src="https://img.shields.io/github/package-json/v/l376405/hashirbot-backend" alt="版本" /></a>
  <a href="https://github.com/l376405/hashirbot-backend" target="_blank"><img src="https://img.shields.io/github/package-json/license/l376405/hashirbot-backend" alt="授權" /></a>
  <a href="https://discord.js.org/" target="_blank"><img src="https://img.shields.io/badge/discord.js-v14.18.0-blue" alt="Discord.js 版本" /></a>
  <a href="https://twurple.js.org/" target="_blank"><img src="https://img.shields.io/badge/twurple-v7.2.1-purple" alt="Twurple 版本" /></a>
</p>

---

## 專案簡介

HashirBot 後端服務是一個用於 Discord 和 Twitch 聊天機器人的後端服務。它基於 [NestJS](https://nestjs.com) 框架，並整合了 [Discord.js](https://discord.js.org/) 和 [Twurple](https://twurple.js.org/) 來與 Discord 和 Twitch API 互動。該機器人支援自訂指令、使用者上下文解析以及動態回應。

---

## 功能特點

- **Discord 整合**：監聽 Discord 頻道中的訊息並動態回應。
- **Twitch 整合**：監聽 Twitch 聊天訊息並動態回應。
- **指令解析**：支援帶參數的自訂指令。
- **使用者上下文**：從訊息中解析與使用者相關的資料。
- **資料庫整合**：使用 PostgreSQL 和 TypeORM 進行資料持久化。
- **環境設定**：支援 `.env` 文件進行環境變數配置。

---

## 專案設定

### 先決條件

- Node.js (v16 或更高版本)
- npm (v7 或更高版本)
- PostgreSQL (v12 或更高版本)

### 安裝步驟

1. 克隆此專案：

   ```bash
   $ git clone https://github.com/l376405/hashirbot-backend.git
   $ cd hashirbot-backend
   ```

2. 安裝依賴：

   ```bash
   $ npm install
   ```

3. 配置環境變數：

   在專案根目錄下建立 `.env` 文件，並新增以下內容：

   ```env
   # Discord Bot
   DISCORD_TOKEN=your_discord_bot_token

   # Twitch Bot
   TWITCH_CLIENT_ID=your_twitch_client_id
   TWITCH_ACCESS_TOKEN=your_twitch_access_token
   TWITCH_CHANNEL=your_twitch_channel

   # 資料庫
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database

   # 環境
   NODE_ENV=development
   ```

4. 執行資料庫遷移（如果適用）：

   ```bash
   $ npm run typeorm migration:run
   ```

---

## 運行專案

### 正常運行
```bash
$ npm run start
```

### 開發模式

```bash
$ npm run start:dev
```

### 生產模式

```bash
$ npm run build
$ npm run start:prod
```

---

## 測試

### 單元測試

```bash
$ npm run test
```

### 端對端測試

```bash
$ npm run test:e2e
```

### 全部測試

```bash
$ npm run test:all
```

### 測試覆蓋率

```bash
$ npm run test:cov
```

---

## 部署

部署專案的步驟如下：

1. 編譯專案：

   ```bash
   $ npm run build
   ```

2. 將編譯後的檔案部署到伺服器或雲端平台。

3. 確保 `.env` 文件在生產環境中已正確配置。

---

## 指令範例

以下是機器人支援的一些指令範例：

### Discord 指令

- `!hello`：回應問候訊息。
- `!userinfo`：顯示使用者的相關資訊。
- `!help`：列出所有可用指令。

### Twitch 指令

- `!shoutout <username>`：為指定的使用者發送歡呼訊息。
- `!uptime`：顯示直播的持續時間。
- `!help`：列出所有可用指令。

---

## 資源

- [NestJS 官方文件](https://docs.nestjs.com)
- [Discord.js 官方文件](https://discord.js.org/#/docs)
- [Twurple 官方文件](https://twurple.js.org/)
- [TypeORM 官方文件](https://typeorm.io/)
- [PostgreSQL 官方文件](https://www.postgresql.org/docs/)

---

## 支援

如果您遇到任何問題或有疑問，請在 [GitHub 專案](https://github.com/l376405/hashirbot-backend/issues) 中提交 Issue。

---

## 授權

此專案的授權為 [UNLICENSED](https://github.com/l376405/hashirbot-backend/blob/main/LICENSE)。