// const path = require('path');
// const pathSrc = path.join(__dirname, '../src');
const { ProgressPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const { pages } = require('./multipage.config'); // для многостраничного сайта. требуется: multipage.config.js
const { devMode, prodMode } = require('./constants');

const result = {};

// для многостраничного сайта. требуется: multipage.config.js
const htmlPlugins = pages.map((page) => new HtmlWebpackPlugin({
  inject: true,
  favicon: './src/assets/favicon.ico', // Для браузеров которые поддерживают svg. В каталоге билда будет файл.svg. А для остальных браузеров используем плагин FaviconsWebpackPlugin.
  template: page.template,
  filename: page.page,
  chunks: [...page.chunks],
  minify: prodMode, // minify авто-ки работает в prod режиме и не применяется для dev. но это можно изменить ( buildType !== constants.modes.dev ? false : true )
}));

result.plugins = [
  new ProgressPlugin(), // выводит в консоль прогресс выполнения сборки
  new MiniCssExtractPlugin({
    filename: devMode ? 'styles/[name].css' : 'styles/[name].[contenthash].css', // styles/[name] обязательно указать [name] для корректного создания имен результирующих файлов
  }),

  ...htmlPlugins, // для многостраничного сайта. требуется: multipage.config.js
  // new HtmlWebpackPlugin({ // для одностраничного сайта
  //     favicon: './src/assets/favicon.svg', // Для браузеров которые поддерживают svg. В каталоге билда будет файл.svg. А для остальных браузеров используем плагин FaviconsWebpackPlugin.
  //     template: path.join(pathSrc, './pages/desktop_petstory.html'),
  //     minify: prodMode // minify авто-ки работает в prod режиме и не применяется для dev. но это можно изменить (!==)
  // })
];

result.module = {
  rules: [
    { // CSS
      test: /\.(c|sa|sc)ss$/i,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // devMode
        'css-loader',
        // {
        //     loader: 'css-loader',
        //     options: {
        //         modules: {
        //             localIdentName: "[name]__[local]--[hash:base64:5]", // [path]
        //         },
        //     },
        // },

        {
          loader: 'postcss-loader', // для работы postcss-loader
          options: {
            postcssOptions: { plugins: [postcssPresetEnv] }, // Подключение плагина, в котором включены авто префиксы. Опирается на 'browserslist'
          },
        },
        'sass-loader', // в файл result-list.js: добавить: import './index.scss
        // {
        //     loader: 'sass-resources-loader', options: {
        //         resources: [path.join(__dirname, '../src/styles/_vars.scss' ), ]
        //     }
        // },
      ],
    },

    { // import 'file.html'
      test: /\.(html)$/i, // для работы c изображениями в html и pug, и обновления сервера отладки
      loader: 'html-loader', // в файле index.js: добавить: import './index.html'
    },

    {
      test: /\.(jpe?g|png|webp|gif|svg|ico|mp3)$/i,
      type: 'asset/resource',
      generator: { // без генератор все файлы будут добавляться в корень public
        filename: 'asset/[name][ext]',
      },
    },

    { // JS
      test: /\.m?js$/i,
      exclude: /node_modules/, // (node_modules|bower_components)
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env', // дополнительный пакет для гибкой настройки. Опирается на 'browserslist'
            // '@babel/preset-react', // для работы в React и c его файлами jsx
          ],
        },
      },
    },

  ],
};

result.optimization = { // оптимизация для правильной работе с chunks
  splitChunks: {
    chunks: 'all',
  },
};

// webpack автоматически применяет оптимизацию при режиме продакшн.
// Данные значения являются значениями по умолчанию и для режима продакшн их можно изменить если необходимо отключить оптимизацию для продакшн

if (prodMode) {
  result.optimization = {
    ...result.optimization,
    minimize: true, // false - чтоб выключить в режиме prod. В dev не используется.
    // minimizer: [ `...`, new TerserPlugin(), new CssMinimizerPlugin()],
    // minimizer: [new TerserPlugin()],
  };
}
// TerserPlugin - оптимизация js кода в режиме prod. Можно не устанавливать плагин если не требуется дальнейшие настройки

module.exports = result;
