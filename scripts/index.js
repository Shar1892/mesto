let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close')

let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity')

let form = popup.querySelector('.popup__form')
let inputName = form.querySelectorAll('.popup__input')[0];
let inputActivity = form.querySelectorAll('.popup__input')[1];
let saveButton = form.querySelector('.popup__save-button');


function openPopup() {
  popup.classList.add('popup_opened');
  fillInput();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function fillInput() {
  inputName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
}

function formSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileActivity.textContent = inputActivity.value;

  closePopup();
}


editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmit);