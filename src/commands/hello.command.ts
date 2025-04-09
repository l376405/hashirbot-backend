export class HelloCommand {
  name = 'hello'; // 統一指令名稱
  private responses = {
    discord: '👋 Hello from Discord!',
    twitch: '🎮 Hello from Twitch!',
  };

  getResponse(platform: 'discord' | 'twitch'): string {
    return this.responses[platform];
  }

  setResponse(platform: 'discord' | 'twitch', response: string) {
    this.responses[platform] = response;
  }
}
