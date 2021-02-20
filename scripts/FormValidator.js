export class FormValidator {
  constructor(settingsObject, formElement) {
    this.config = settingsObject;
    this.form = formElement;
  }


  _hideInputError(inputElement) {
    const errorElement = this.form.querySelector(`.overlay__${inputElement.id}-error`);
  
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorMassage) {
    const errorElement = this.form.querySelector(`.overlay__${inputElement.id}-error`);
  
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMassage;
    errorElement.classList.add(this.config.errorClass);
  }

  _clearValidationErrors() {
    const inputList = Array.from(this.form.querySelectorAll(this.config.inputSelector));
    const buttonElement = this.form.querySelector(this.config.submitButtonSelector);
  
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
    this._toggleButtonState(inputList, buttonElement);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasIvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasIvalidInput(inputList)) {
      buttonElement.classList.add(this.config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this.form.querySelectorAll(this.config.inputSelector));
    const buttonElement = this.form.querySelector(this.config.submitButtonSelector);
  
    if (this.form.name === 'place-data') {
      this._toggleButtonState(inputList, buttonElement);
    }
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  
  }

  enableValidation() {
  
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    this._setEventListeners();
    this._clearValidationErrors();
  }

}
