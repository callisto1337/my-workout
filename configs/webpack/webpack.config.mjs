import path from 'path';
import { fileURLToPath } from 'url';
import plugins from './plugins/index.mjs';
import module from './module/index.mjs';
import resolve from './resolve/index.mjs';
import devServer from './devServer/index.mjs';

const { NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  context: path.resolve(__dirname, '../../'),
  entry: './src/index.tsx',
  mode: NODE_ENV,
  plugins,
  module,
  resolve,
  devServer,
};
