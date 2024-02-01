import tranls from './js/translate';

let lang = localStorage.getItem('lang') || 'ru';

const wrapper = document.createElement('div');
const resultTitle = document.createElement('div');
const resultText = document.createElement('div');
const resultBtn = document.createElement('button');
wrapper.append(resultTitle, resultText);
const container = document.querySelector('.result');
container.append(wrapper);

function getRes() {
  const score = localStorage.getItem('score');
  if (score < 30) {
    wrapper.append(resultBtn);
    return tranls['result-text'][lang].replace('{score}', score);
  }
  return tranls['result-text-f'][lang];
}

wrapper.classList.add('result__wrapper');

resultTitle.classList.add('result__title');
resultTitle.textContent = 'Ваш результат:';
resultTitle.setAttribute('data-lng', 'result-title');

resultText.classList.add('result__text');
resultText.textContent = `${getRes()}`;
resultText.setAttribute('data-lng', 'result-text');

resultBtn.classList.add('result__btn');
resultBtn.textContent = 'Попробовать еще раз!';
resultBtn.setAttribute('data-lng', 'result-btn');
resultBtn.onclick = () => {
  window.location.href = 'quiz.html';
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
  resultText.textContent = `${getRes()}`;
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
