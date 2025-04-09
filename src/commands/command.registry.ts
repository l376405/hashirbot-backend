//註冊共用指令
import { HelloCommand } from './hello.command';
import { PingCommand } from './ping.command'; // 新增 Ping 指令

export const CommandRegistry = [
  new HelloCommand(), // 未來新增指令時，只需加到這裡
  new PingCommand(), // 新增 Ping 指令
];
