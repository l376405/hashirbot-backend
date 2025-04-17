/**
 * @file command.registry.ts
 * @description 註冊共用指令
 * @author HaSHIrosabi
 * @copyright Copyright (c) 2025 HaSHIrosabi
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this project.
 */

// ...existing code...

import { HelloCommand } from './hello.command';
import { PingCommand } from './ping.command'; // 新增 Ping 指令

export const CommandRegistry = [
  new HelloCommand(), // 未來新增指令時，只需加到這裡
  new PingCommand(), // 新增 Ping 指令
];
