import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const overlays = Array.from(document.querySelectorAll('.overlay'));

const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity')

const elementsContainer = document.querySelector('.elements');

const overlayProfile = document.querySelector('.overlay_type_profile');
const formProfile = overlayProfile.querySelector('.overlay__form_type_edit-profile');
const inputUserName = formProfile.querySelector('.overlay__input_type_user-name');
const inputActivity = formProfile.querySelector('.overlay__input_type_user-activity');

const overlayPlace = document.querySelector('.overlay_type_place');
const formPlace = overlayPlace.querySelector('.overlay__form_type_add-place');
const inputPlaceName = formPlace.querySelector('.overlay__input_type_place-name');
const inputPlaceLink = formPlace.querySelector('.overlay__input_type_place-link');

export const overlayImage = document.querySelector('.overlay_type_image');
const imageContainer = overlayImage.querySelector('.overlay__image-contauner');
const image = imageContainer.querySelector('.overlay__image');
const imageName = imageContainer.querySelector('.overlay__image-name');

const elementSelectors = {
  formSelector: '.overlay__form',
  inputSelector: '.overlay__input',
  submitButtonSelector: '.overlay__save-button',
  inactiveButtonClass: 'overlay__save-button_disabled',
  inputErrorClass: 'overlay__input_type_error',
  errorClass: 'overlay__input-error_visible'
}



function enableValidationForm(settingsObject, formElement) {
  const form = new FormValidator(settingsObject, formElement);

  form.enableValidation();
}

function fillProfileInput() {
  inputUserName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
}

export function showElement(element) {
  element.classList.add('page__popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function openPopupEditProfile() {
  showElement(overlayProfile);
  fillProfileInput();

  enableValidationForm(elementSelectors, formProfile);
}

function openPopupAddPlace() {
  showElement(overlayPlace);
  clearPlaceInputs();
  enableValidationForm(elementSelectors, formPlace);
}

function clearPlaceInputs() {
  formPlace.reset();
}

function closePopup(overlay) {
  overlay.classList.remove('page__popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

overlays.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('page__popup_opened')) {
      closePopup(overlay);
    }
    if (evt.target.classList.contains('overlay__close')) {
      closePopup(overlay);
    }
  });
})

function hasIvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function profileFormSubmit(evt) {
  evt.preventDefault();
  
  if (!hasIvalidInput([inputUserName, inputActivity])) {
    profileName.textContent = inputUserName.value;
    profileActivity.textContent = inputActivity.value;

    closePopup(overlayProfile);
  }

}

function placeFormSubmit(evt) {
  evt.preventDefault();

  if (!hasIvalidInput([inputPlaceName, inputPlaceLink])) {
    elementsContainer.prepend(drawCard(inputPlaceName.value, inputPlaceLink.value));
    
    closePopup(overlayPlace);
  }
}


function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openPopup= document.querySelector('.page__popup_opened')
    closePopup(openPopup);
  }
}

export function fillPhotoData(link, name) {
  image.src = link;
  image.alt = name;
  imageName.textContent = name;
}


editProfileButton.addEventListener('click', openPopupEditProfile);
addPlaceButton.addEventListener('click', openPopupAddPlace);

formProfile.addEventListener('submit', profileFormSubmit);
formPlace.addEventListener('submit', placeFormSubmit);


function drawCard(link, name) {
  const card = new Card(link, name, '#element');
  const cardElement = card.createCard();

  return cardElement;
}

function drawInitialCards() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialCards.reverse().forEach(function(item) {
    elementsContainer.prepend(drawCard(item.name, item.link));
  });
}

drawInitialCards();