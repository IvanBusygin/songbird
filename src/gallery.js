import dbRu from './js/db-ru';
import dbEn from './js/db-en';
import tranls from './js/translate';
import BirdCard from './js/classes/Bird-card';
import determineLang from './js/lang';

let lang = determineLang();

const pagination = document.querySelector('.pagination');
const paginationItems = document.querySelectorAll('.pagination__item');
const galleryContent = document.querySelector('.gallery__content');

let previousTarget;

function showGallery(current = previousTarget) {
  const db = lang === 'en' ? dbEn : dbRu;
  if (current) {
    previousTarget = current || previousTarget;
    paginationItems.forEach((i) => i.classList.remove('pagination__item--active'));
    current.classList.add('pagination__item--active');
    const block = document.createElement('div');
    block.classList.add('gallery__block');
    const birds = db[current?.dataset.id];
    birds.forEach((obj) => {
      const elem = document.createElement('div');
      elem.classList.add('gallery__item');
      const birdCard = new BirdCard(obj);
      elem.append(birdCard.elem);
      block.append(elem);
    });
    galleryContent.innerHTML = '';
    galleryContent.append(block);
  }
}
pagination.onclick = ({ target }) => {
  const current = target.closest('.gallery__pag');
  if (current) {
    showGallery(current);
  }
};

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
  showGallery();
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
