// tool.mjs;
/* eslint-disable */
//@ts-nocheck
import { installDependencies, runCommand } from './runCommands/runCommands-install.mjs';
import { logger } from './runCommands/runCommands-logger.mjs';

// 主函数，根据参数判断是否执行 installDependencies
async function runCommands(shouldInstall = false) {
  try {
    if (shouldInstall) {
      await installDependencies(); // 执行安装依赖
    }
    // 执行 `pnpm install`
    await runCommand('pnpm', ['install']);
    // 执行 approve-builds
    await runCommand('pnpm', ['approve-builds']); // 执行 `pnpm approve-builds`
  } catch (error) {
    logger.error('发生错误:', error); // 红色输出错误信息
  }
}

// 解析命令行参数
const args = process.argv.slice(2); // 获取传入的命令行参数
const shouldInstall = args.includes('--install'); // 如果参数中有 --install，则执行 installDependencies

runCommands(shouldInstall); // 根据参数决定是否执行 installDependencies
