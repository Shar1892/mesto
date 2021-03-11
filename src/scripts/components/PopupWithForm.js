import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._element.querySelector('.overlay__form');
    this._getInputValue();
    this._formSubmit = submitCallback;
  }

  _getInputValue() {
    this._inputList = this._form.querySelectorAll('.overlay__input');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._formSubmit(evt, {
        name: this._inputList[0].value,
        activity: this._inputList[1].value
      })
    });
  }

  close() {
    super.close();
    this._inputList[0].value = '';
    this._inputList[1].value = '';
  }

  open(data) {
    super.open();
    this._inputList[0].value = data.name;
    this._inputList[1].value = data.activity;
  }
}