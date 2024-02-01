const path = require('path');
// const pathSrc = path.join(__dirname, '../src');
const { entry } = require('./multipage.config'); // для многостраничного сайта. требуется: multipage.config.js

const { devMode, mode } = require('./constants');

const target = devMode ? 'web' : 'browserslist'; // node[[X].Y] | esX web
const devtool = devMode ? 'source-map' : undefined; // source-map | eval-source-map | eval (default)    изменять параметр может потребоваться только на этапе разработки
console.log('mode:', mode);
console.log('devtool:', devtool);
console.log('target:', target);

module.exports = {
  mode,
  target,
  devtool,
  // context: path.join(__dirname, '../src'), // указывается папка (контекст) для входных файлов .js
  entry: {
    // main: path.join(pathSrc, 'main.js'), // Задает выходное имя для указанного файла. Для одностраничного сайта
    ...entry, // для многостраничного сайта. требуется: multipage.config.js
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name]-[hash][ext]',
    clean: true, // очистка папки при создании новой сборки
  },
  devServer: {
    port: 'auto',
    static: path.join(__dirname, '../src'), // , path.join(__dirname, '../dist')
    hot: true,
    // open: true,
  },
  // cache: {type: 'filesystem'}, // заметил, плохо обновляются файлы при проверке работы babel
  // resolve: {
  //     // extensions: ['.js', '.ts', '.png'], // перечисляются расширения которые не обязательно писать в import файла
  //     alias: {
  //         '@models': path.join(__dirname, '../src/models'), // сокращенные пути к папкам. можно использовать только в имени пути импортов
  //         '@pages': path.join(__dirname, '../src/pages'),
  //     }
  // },

};
