import {fillPhotoData, showElement, overlayImage} from './index.js';

export class Card {
  constructor(name, image, selector) {
    this.image = image;
    this.name = name;
    this.selector = selector;
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

  _openImage() {
    fillPhotoData(this.image, this.name);
    showElement(overlayImage);
  }

  _setEventListeners() {
    this.photo.addEventListener('click', () => {
      this._openImage();
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