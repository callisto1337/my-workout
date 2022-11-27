import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import plugins from './plugins/index.mjs';

const { NODE_ENV } = process.env;
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  context: resolve(__dirname, '../../'),
  entry: './index.js',
  mode: NODE_ENV,
  plugins,
};
