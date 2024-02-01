import './pages/index.html';
import determineLang from './js/lang';

import { randomArray } from './js/lib/funs-random';
import dbRu from './js/db-ru';
import dbEn from './js/db-en';
import tranls from './js/translate';

let lang = determineLang();
const db = lang === 'en' ? dbEn : dbRu;

const gal = db.flat();

const randArr = randomArray(9, 0, gal.length - 1);
const birdGrid = document.querySelector('.bird-grid');
randArr.forEach((cell) => {
  const bird = gal[cell];
  const elem = document.createElement('img');
  elem.classList.add('bird-grid__cell');
  elem.src = bird.image;
  birdGrid.append(elem);
  const audi = bird.audio;
  const player = new Audio(audi);
  elem.addEventListener('mouseenter', () => player.play());
  elem.addEventListener('mouseleave', () => setTimeout(() => player.pause(), 700));
});

const btnRu = document.querySelector('.lang--ru');
const btnEn = document.querySelector('.lang--en');
const elements = document.querySelectorAll('[data-lng]');

function translation() {
  elements.forEach((elem) => {
    const dataValue = elem.dataset.lng;
    const trans = tranls[dataValue]?.[lang];
    if (trans) elem.textContent = trans;
  });
  if (lang === 'ru') {
    btnRu.classList.add('lang__btn--active');
    btnEn.classList.remove('lang__btn--active');
  }
  if (lang === 'en') {
    btnEn.classList.add('lang__btn--active');
    btnRu.classList.remove('lang__btn--active');
  }
}

btnRu.onclick = () => {
  lang = 'ru';
  localStorage.setItem('lang', lang);
  translation(lang);
};

btnEn.onclick = () => {
  lang = 'en';
  localStorage.setItem('lang', lang);
  translation(lang);
};

translation(lang);
