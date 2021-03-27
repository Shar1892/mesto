export const elementSelectors = {
  formSelector: '.overlay__form',
  inputSelector: '.overlay__input',
  submitButtonSelector: '.overlay__save-button',
  inactiveButtonClass: 'overlay__save-button_disabled',
  inputErrorClass: 'overlay__input_type_error',
  errorClass: 'overlay__input-error_visible'
}


export const avatarHover = document.querySelector('.profile__pencil-container');

export const editProfileButton = document.querySelector('.profile__edit-button');
export const addPlaceButton = document.querySelector('.profile__add-button');

export const profileName = document.querySelector('.profile__name');
export const profileActivity = document.querySelector('.profile__activity')
export const profileAvatar = document.querySelector('.profile__avatar');


const overlayProfile = document.querySelector('.overlay_type_profile');
export const formProfile = overlayProfile.querySelector('.overlay__form_type_edit-profile');

const overlayPlace = document.querySelector('.overlay_type_place');
export const formPlace = overlayPlace.querySelector('.overlay__form_type_add-place');

const overlayAvatar = document.querySelector('.overlay_type_avatar');
export const formAvatar = overlayAvatar.querySelector('.overlay__form_type_avatar');


export const initialCardsList = [
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