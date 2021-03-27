import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(selector, submitCallback, api) {
    super(selector);
    this._form = this._element.querySelector('.overlay__form');
    this._formSubmit = submitCallback;
    this._api = api
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit({
        id: this._idCard,
        element: this._card
      });
    });
  }


  open(data) {
    super.open();
    this._idCard = data.id;
    this._card = data.element;
  }
}