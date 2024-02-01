const path = require('path');

const pathSrc = path.join(__dirname, '../src');

const result = {};

result.entry = {
  //    Пути к js файлам которые должны быть связаты с html
  // "main": path.join(__dirname, '../src/index.js')
  //  пути к js файлам (программная часть для html) которые должны быть связаны с html файлами
  //  имя результирующих бандлов: путь к первоначальному файлу (являющийся корневым для его формирования)

  main: path.join(pathSrc, 'index.js'),
  quiz: path.join(pathSrc, 'quiz.js'),
  results: path.join(pathSrc, 'results.js'),
  gallery: path.join(pathSrc, 'gallery.js'),
  style: path.join(pathSrc, 'style.js'),
};

result.pages = [
  //    Связь между js бандлами и html файлами
  // { chunks:  [массив. Содержит бандлы, которые должны связываться с html файлом],
  // page: относительный путь к результирующему html относительно корня web-сервера, (конечного файла после обработки)
  // template: путь к исходному html файлу), },

  { chunks: ['main', 'style'], page: 'index.html', template: path.join(pathSrc, './pages/index.html') },
  { chunks: ['quiz', 'style'], page: 'quiz.html', template: path.join(pathSrc, './pages/quiz.html') },
  { chunks: ['results', 'style'], page: 'results.html', template: path.join(pathSrc, './pages/results.html') },
  { chunks: ['gallery', 'style'], page: 'gallery.html', template: path.join(pathSrc, './pages/gallery.html') },
];

module.exports = result;
