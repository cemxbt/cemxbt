#!/usr/bin/env node

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (text) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : text);

const bold = paint('1');
const dim = paint('2');
const blue = paint('38;5;75');
const green = paint('38;5;77');
const red = paint('38;5;203');
const gray = paint('38;5;245');

// A tiny candlestick chart, the same motif as the GitHub profile banner.
const chart = [
  red('▂'), green('▃'), green('▄'), red('▃'), green('▅'), green('▆'),
  red('▅'), green('▆'), green('▇'), green('█'), red('▇'), green('█'),
].join('');

const rows = [
  '',
  `${bold('Cem Ali Kayahan')}  ${chart}`,
  gray('Backend & Software Engineer · Istanbul'),
  '',
  `${dim('Building')}   ${bold('bottomUP')} ${gray('— AI, fintech & Web3')}`,
  `${dim('Focus')}      APIs · system architecture · trading tools`,
  '',
  `${dim('GitHub')}     ${blue('https://github.com/cemxbt')}`,
  `${dim('Web')}        ${blue('https://bottomup.app')}`,
  `${dim('Email')}      ${blue('cemalikayahan@gmail.com')}`,
  '',
  `${dim('Card')}       ${gray('npx cemxbt')}`,
  '',
];

// Measure visible width: strip colour codes, count code points.
const visible = (s) => [...s.replace(/\x1b\[[0-9;]*m/g, '')].length;
const width = Math.max(...rows.map(visible)) + 4;

const border = gray;
const line = (content) =>
  border('│') + '  ' + content + ' '.repeat(width - 2 - visible(content)) + border('│');

console.log(
  [
    border('╭' + '─'.repeat(width) + '╮'),
    ...rows.map(line),
    border('╰' + '─'.repeat(width) + '╯'),
  ].join('\n'),
);
