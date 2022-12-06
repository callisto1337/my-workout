import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import DotEnv from 'dotenv-webpack';

export default [
  new HtmlWebpackPlugin({
    template: './index.html',
  }),
  new ForkTsCheckerWebpackPlugin(),
  new DotEnv(),
];
