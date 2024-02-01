import { randomInteger } from '../lib/funs-random';
import BirdCard from './Bird-card';
import dbRu from '../db-ru';
import dbEn from '../db-en';
import tranls from '../translate';
import audioWin from '../../assets/win.mp3';
import audioWrong from '../../assets/error.mp3';
import Player from '../../components/player';
import birdIconURL from '../../assets/bird.jpg';
import determineLang from '../lang';

const lang = determineLang();
const db = lang === 'en' ? dbEn : dbRu;

export default class {
  constructor(index) {
    this.score = 5;
    this.finished = false;
    this.arrBirds = db[index];
    this.questBird = this.getQuestion();
    this.elem = this.render();
  }

  getQuestion() {
    const randomBird = randomInteger(0, 5);
    return this.arrBirds[randomBird];
  }

  render() {
    const block = document.createElement('div');
    const question = document.createElement('div');
    const questionImg = document.createElement('img');
    const questionWrapper = document.createElement('div');
    const questionName = document.createElement('div');
    const questionPlayer = new Player(this.questBird.audio);

    question.classList.add('question');
    questionImg.classList.add('question__img');
    questionImg.src = birdIconURL;
    questionWrapper.classList.add('question__wrapper');
    questionName.classList.add('question__name');
    questionName.textContent = '* * * * *';

    questionWrapper.append(questionName, questionPlayer.elem);
    question.append(questionImg, questionWrapper);
    const answers = document.createElement('div');
    const answersList = document.createElement('ul');
    const answersCard = document.createElement('div');
    const btnNext = document.createElement('button');
    answers.classList.add('answers');
    answersList.classList.add('answers__list');
    answersCard.classList.add('answers__card', 'card__init');
    answersCard.textContent = tranls['answers-card'][lang];
    btnNext.classList.add('btn-next');
    btnNext.textContent = tranls['next-question'][lang];

    // console.log('Bird:', this.questBird.name);

    const arrQuestionLi = [];
    for (let i = 0; i < this.arrBirds.length; i++) {
      const li = document.createElement('li');
      li.classList.add('answers__item');
      li.setAttribute('data-li', i);
      li.innerHTML = `<span class="answers__mar"></span>${this.arrBirds[i].name}`;
      arrQuestionLi.push(li);
    }

    const arrAnswersListCards = [];
    for (let i = 0; i < this.arrBirds.length; i++) {
      const objBird = this.arrBirds[i];
      const birdCard = new BirdCard(objBird);
      arrAnswersListCards.push(birdCard);
    }

    answersList.append(...arrQuestionLi);
    answers.append(answersList, answersCard);
    block.append(question, answers, btnNext);

    function rightAnswer(current, that, objBird) {
      questionPlayer.pause();
      current.classList.add('answers__item--success');
      btnNext.classList.add('btn-next--active');
      that.finished = true;
      current.dispatchEvent(new CustomEvent('success', {
        bubbles: true,
        detail: { score: that.score },
      }));
      questionName.textContent = objBird.name;
      questionImg.src = objBird.image;
      const playerWin = new Audio(audioWin);
      playerWin.volume = 0.2;
      playerWin.play();
    }

    function wrongAnswer(current, that) {
      const playerWrong = new Audio(audioWrong);
      playerWrong.volume = 0.2;
      playerWrong.play();
      const hasClass = current.classList.contains('answers__item--wrong');
      if (!hasClass) {
        that.score = Math.max(0, --that.score);
      }
      current.classList.add('answers__item--wrong');
    }

    function updateClass(current) {
      answersCard.classList.remove('card__init');
      arrQuestionLi.forEach((i) => i.classList.remove('answers__item--selected'));
      current.classList.add('answers__item--selected');
    }

    answersList.addEventListener('click', ({ target }) => {
      const current = target.closest('li');
      if (!current) return;
      updateClass(current);
      const name = current.textContent;
      const id = current.dataset.li;
      const objBird = this.arrBirds.filter((i) => i.name === name)[0];
      answersCard.innerHTML = '';
      arrAnswersListCards.forEach((i) => i.player.pause());
      answersCard.append(arrAnswersListCards[id].elem);
      if (!this.finished) {
        const that = this;
        if (current.textContent === this.questBird.name) {
          rightAnswer(current, that, objBird);
        } else {
          wrongAnswer(current, that);
        }
      }
    });

    btnNext.addEventListener('click', ({ target }) => {
      if (target.classList.contains('btn-next--active')) {
        arrAnswersListCards.forEach((i) => i.player.pause());
        questionPlayer.stop();
        btnNext.dispatchEvent(new CustomEvent('next', {
          bubbles: true,
          detail: { next: true },
        }));
      }
    });

    return block;
  }
}
