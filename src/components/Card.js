export class Card {

  constructor(data, selector, handleCardClick, confirmPopup, api, userId) {

    this.image = data.link;
    this.name = data.name;
    this.id = data._id;
    this._ownerId = data.owner._id;
    this._likesCounter = data.likes ? data.likes.length : 0;
    this._likers = data.likes;
    this.selector = selector;
    this._openImage = handleCardClick;
    this._confirmPopup = confirmPopup;
    this._api = api;
    this._userId = userId

  }


  _getTemplate() {
    const cardElement = document.querySelector(this.selector).content.cloneNode(true);
    return cardElement;
  }

    _deleteElement() {
    this._confirmPopup.open({
      id: this.id,
      element: this.card
    });
    
  }

  _setEventListeners() {
    this.photo.addEventListener('click', () => {
      this._openImage({
        link: this.image,
        name: this.name
      });
    });
    this.like.addEventListener('click', () => {
      this._changeLike();
    });
    this.basket.addEventListener('click', () => {
      this._deleteElement();
    });
  }


  _changeLike() {
    if(!this.like.classList.contains('element__like_active')){
      this._api.putLike(this.id)
        .then((res) => {
          this.counter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });

      this.like.classList.add('element__like_active');
    } else {
      this._api.removeLike(this.id)
        .then((res) => {
          this.counter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });

      this.like.classList.remove('element__like_active');
    }
  }


  _checkIsLiked() {
    return this._likers.some((liker) => liker._id === this._userId); 
  }

  _showLike() {
    if(this._likers && this._checkIsLiked()) {
      this.like.classList.add('element__like_active');
    }
  }

  _hideBasket() {
    if (this._ownerId !== this._userId) {
      this.basket.classList.add('element__basket_type_hidden');
    }
  }

  createCard() {
    this.element = this._getTemplate();
    this.card = this.element.querySelector('.element');
    this.like = this.element.querySelector('.element__like');
    this.basket = this.element.querySelector('.element__basket');
    this.photo = this.element.querySelector('.element__photo');
    this.counter = this.element.querySelector('.element__like-counter');

    this._showLike();

    this._hideBasket();

    this.photo.src = this.image;
    this.photo.alt = this.name;
    this.counter.textContent = this._likesCounter;
    this.card.querySelector('.element__name').textContent = this.name;

    this._setEventListeners();

    return this.element;
  }

  showCard(selector) {
    const container = document.querySelector(selector);
    container.prepend(this.createCard());
  }

}