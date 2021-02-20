export class Card {
  constructor(name, image, selector, openImageFunction) {
    this.image = image;
    this.name = name;
    this.selector = selector;
    this._openImage = openImageFunction;
  }


  _getTemplate() {
    const cardElement = document.querySelector(this.selector).content.cloneNode(true);
    return cardElement;
  }

  _changeLike() {
    this.like.classList.toggle('element__like_active');
  }

  _deleteElement() {
    this.card.remove();
  }

  _setEventListeners() {
    this.photo.addEventListener('click', () => {
      this._openImage(this.image, this.name);
    });
    this.like.addEventListener('click', () => {
      this._changeLike();
    });
    this.basket.addEventListener('click', () => {
      this._deleteElement();
    });
  }

  createCard() {
    this.element = this._getTemplate();
    this.card = this.element.querySelector('.element');
    this.like = this.element.querySelector('.element__like');
    this.basket = this.element.querySelector('.element__basket');
    this.photo = this.element.querySelector('.element__photo');

    this.photo.src = this.image;
    this.photo.alt = this.name;
    this.card.querySelector('.element__name').textContent = this.name;

    this._setEventListeners();

    return this.element;
  }
}