// import './styles/style.scss';
import QuestionCard from './js/classes/Quiz';

import tranls from './js/translate';
import determineLang from './js/lang';

const lang = determineLang();

const elements = document.querySelectorAll('[data-lng]');

let countQuestion = 0;
let questionCard;

function translation() {
  elements.forEach((elem) => {
    const dataValue = elem.dataset.lng;
    const trans = tranls[dataValue]?.[lang];
    if (trans) elem.textContent = trans;
  });
}
translation();

function startQuiz() {
  const pagination = document.querySelectorAll('.pagination__item');
  pagination.forEach((i) => i.classList.remove('pagination__item--active'));
  pagination[countQuestion].classList.add('pagination__item--active', 'pagination__item--passed');

  questionCard = new QuestionCard(countQuestion);
  const questionContainer = document.querySelector('.question-container');
  questionContainer.innerHTML = '';
  questionContainer.append(questionCard.elem);
}

const score = document.querySelector('.score__value');

document.addEventListener('success', (event) => {
  score.textContent = +score.textContent + +event.detail.score;
});

document.addEventListener('next', () => {
  countQuestion++;
  if (countQuestion < 6) {
    startQuiz();
  } else {
    localStorage.setItem('score', score.textContent);
    window.location.href = 'results.html';
  }
});

startQuiz();
