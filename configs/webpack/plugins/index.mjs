import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export default [
  new HtmlWebpackPlugin({
    template: './index.html',
  }),
  new ForkTsCheckerWebpackPlugin(),
];
