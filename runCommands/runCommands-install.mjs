// tools\tools-install.mjs
/* eslint-disable */

/* eslint-disable */
import { spawn } from 'child_process';
import path from 'path';
import logger from './runCommands-logger.mjs';

// 运行 PowerShell 命令并实时输出
export const runPowerShell = (command) =>
  new Promise((resolve, reject) => {
    logger.command(`执行 PowerShell 命令: ${command}`);

    const process = spawn(
      'powershell.exe',
      ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', command],
      {
        shell: true,
        stdio: 'inherit', // 直接把 stdout 和 stderr 继承到当前进程，实时输出
      },
    );

    process.on('close', (code) => {
      if (code === 0) {
        resolve(null);
      } else {
        logger.error(`命令失败，退出码: ${code}`);
        reject(new Error(`命令失败，退出码: ${code}`));
      }
    });
  });

const currentDirectory = path.resolve('./');
const nodeModulesPath = path.join(currentDirectory, 'node_modules');
export { currentDirectory, nodeModulesPath };
// 封装 `runCommand` 执行过程，可以接收命令参数
export const runCommand = async (command, args = []) => {
  logger.info(`开始运行 ${command} ${args.join(' ')}...`);
  const fullCommand = [command, ...args].join(' '); // 构建完整命令
  await runPowerShell(fullCommand);
  logger.success(`Done! ${fullCommand}`);
};

// 安装依赖并删除 node_modules
export const installDependencies = async () => {
  logger.warn(`准备删除: ${nodeModulesPath}`);
  await runPowerShell(`Remove-Item -Recurse -Force '${nodeModulesPath}'`);
  logger.success('成功删除 ./node_modules');
};
