import { resolve } from 'path';

export const entry = resolve(__dirname, 'src', 'index.js');
export const output = {
  path: resolve(__dirname, 'dist'),
  filename: 'bundle.js',
};
export const devServer = {
  contentBase: resolve(__dirname, 'dist'),
  open: true,
  clientLogLevel: 'silent',
  port: 3000,
};
export const module = {
  rules: [
    {
      test: /\.(jsx|js)$/,
      include: resolve(__dirname, 'src'),
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: 'defaults',
            }],
            '@babel/preset-react',
          ],
        },
      }],
    },
  ],
};
