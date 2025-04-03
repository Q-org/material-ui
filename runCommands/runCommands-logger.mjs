/* eslint-disable */
//@ts-nocheck
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// const chalk = require('chalk').default;
import chalk from 'chalk';

const log = (level, color, message) => {
  if (!message) return; // 统一检查 message 是否为空
  console.log(chalk[color](`[${level}] ${message}`));
};

export const logger = {
  info: (message) => log('INFO', 'cyan', message),
  warn: (message) => log('WARN', 'yellow', message),
  error: (message) => log('ERROR', 'red', message),
  success: (message) => log('SUCCESS', 'green', message),
  command: (message) => log('COMMAND', 'magenta', message),
};

export default logger;
