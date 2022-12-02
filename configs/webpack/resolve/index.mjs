import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export default {
  extensions: ['...', '.ts', '.tsx'],
  plugins: [new TsconfigPathsPlugin()],
};
