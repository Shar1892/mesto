import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._element.querySelector('.overlay__form');
    this._inputList = this._form.querySelectorAll('.overlay__input');
    this._formSubmit = submitCallback;
  }

  _getInputValue() {
    this._formValues = {};
    this._inputList.forEach((input) => {this._formValues[input.name] = input.value});
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValue());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _setInputValue(data) {
    this._inputList.forEach((input) => {input.value = data[input.name] || ''});
  }

  open(data) {
    super.open();
    this._setInputValue(data);
  }
}