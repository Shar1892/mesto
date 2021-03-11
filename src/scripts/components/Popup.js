export class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }

  open() {
    this._element.classList.add('page__popup_opened');
    document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
  }

  close() {
    this._element.classList.remove('page__popup_opened');
    document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('page__popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('overlay__close')) {
        this.close();
      }
    });
  }
}