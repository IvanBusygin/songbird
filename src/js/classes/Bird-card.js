import Player from '../../components/player';

export default class {
  constructor(obj) {
    this.obj = obj;
    this.player = new Player(obj.audio);
    this.elem = this.render();
  }

  render() {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardWrapper = document.createElement('div');
    const cardName = document.createElement('div');
    const cardSpecies = document.createElement('div');
    const cardDescription = document.createElement('div');
    card.classList.add('card');
    cardHeader.classList.add('card__header');
    cardImg.classList.add('card__img');
    cardImg.src = this.obj.image;
    cardWrapper.classList.add('card__wrapper');
    cardName.classList.add('card__name');
    cardName.textContent = this.obj.name;
    cardSpecies.classList.add('card__species');
    cardSpecies.textContent = this.obj.species;

    cardWrapper.append(cardName, cardSpecies, this.player.elem);
    cardHeader.append(cardImg, cardWrapper);
    cardDescription.classList.add('card__description');
    cardDescription.textContent = this.obj.description;
    card.append(cardHeader, cardDescription);
    return card;
  }
}
