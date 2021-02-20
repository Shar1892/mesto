export class FormValidator {
  constructor(settingsObject, formElement) {
    this.config = settingsObject;
    this.form = formElement;
    this.inputList = Array.from(this.form.querySelectorAll(this.config.inputSelector));
    this.buttonElement = this.form.querySelector(this.config.submitButtonSelector);
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

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasIvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasIvalidInput()) {
      this.buttonElement.classList.add(this.config.inactiveButtonClass);
    } else {
      this.buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
  }

  _setEventListeners() {  
    this._toggleButtonState();
  
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  clearValidationErrors() {
  
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
  
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    this._setEventListeners();
  }

}
