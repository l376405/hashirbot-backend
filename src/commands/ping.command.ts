export class PingCommand {
    name = 'ping'; // 指令名稱
  
    getResponse(): string {
      return '🏓 Pong! 機器人正常運作中';
    }
  }