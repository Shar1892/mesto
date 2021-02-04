const elementSelectors = {
  formSelector: '.overlay__form',
  inputSelector: '.overlay__input',
  submitButtonSelector: '.overlay__save-button',
  inactiveButtonClass: 'overlay__save-button_disabled',
  inputErrorClass: 'overlay__input_type_error',
  errorClass: 'overlay__input-error_visible'
}


function showInputError(settingsObject, formElement, inputElement, errorMassage) {
  const errorElement = formElement.querySelector(`.overlay__${inputElement.id}-error`);

  inputElement.classList.add(settingsObject.inputErrorClass);
  errorElement.textContent = errorMassage;
  errorElement.classList.add(settingsObject.errorClass);
}


function hideInputError(settingsObject, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.overlay__${inputElement.id}-error`);

  inputElement.classList.remove(settingsObject.inputErrorClass);
  errorElement.classList.remove(settingsObject.errorClass);
  errorElement.textContent = '';
}


function checkInputValidity(settingsObject, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(settingsObject, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(settingsObject, formElement, inputElement);
  }
}


function setEventListeners(settingsObject, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
  const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);

  if (formElement.name === 'place-data') {
    toggleButtonState(settingsObject, inputList, buttonElement);
  }

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(settingsObject, formElement, inputElement);
      toggleButtonState(settingsObject, inputList, buttonElement);
    });
  });

}


function enableValidation(settingsObject) {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(settingsObject, formElement);
  });
}


function hasIvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


function toggleButtonState(settingsObject, inputList, buttonElement) {
  if (hasIvalidInput(inputList)) {
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
  }
}

enableValidation(elementSelectors);