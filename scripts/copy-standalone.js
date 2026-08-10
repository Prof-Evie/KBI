const { cpSync, mkdirSync } = require('node:fs');
const { dirname, join } = require('node:path');

const cwd = process.cwd();
const sourceStatic = join(cwd, '.next', 'static');
const targetStatic = join(cwd, '.next', 'standalone', '.next', 'static');
const sourcePublic = join(cwd, 'public');
const targetPublic = join(cwd, '.next', 'standalone', 'public');

mkdirSync(dirname(targetStatic), { recursive: true });
mkdirSync(targetPublic, { recursive: true });

cpSync(sourceStatic, targetStatic, { recursive: true });
cpSync(sourcePublic, targetPublic, { recursive: true });
