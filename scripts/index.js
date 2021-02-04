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

const overlayImage = document.querySelector('.overlay_type_image');
const imageContainer = overlayImage.querySelector('.overlay__image-contauner');
const image = imageContainer.querySelector('.overlay__image');
const imageName = imageContainer.querySelector('.overlay__image-name');

const selectors = {
  inputSelector: '.overlay__input',
  submitButtonSelector: '.overlay__save-button',
  inactiveButtonClass: 'overlay__save-button_disabled',
  inputErrorClass: 'overlay__input_type_error',
  errorClass: 'overlay__input-error_visible'
}


function checkForm(settingsObject, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
  const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);

  inputList.forEach((inputElement) => {
    checkInputValidity(settingsObject, formElement, inputElement);
    toggleButtonState(settingsObject, inputList, buttonElement);
  });
}

function fillProfileInput() {
  inputUserName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
}

function showElement(element) {
  element.classList.add('page__popup_opened');
}

function addListenerToDocument() {
  document.addEventListener('keydown', closePopupByEsc);
}

function openPopupEditProfile() {
  showElement(overlayProfile);
  fillProfileInput();
  addListenerToDocument();
  checkForm(selectors, formProfile);
}

function openPopupAddPlase() {
  showElement(overlayPlace);
  addListenerToDocument();
  checkForm(selectors, formPlace);
}

function clearPlaceInputs() {
  formPlace.reset();
}

function closePopup(overlay) {
  overlay.classList.remove('page__popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);

  if (overlay.classList.contains('overlay_type_place')) {
    clearPlaceInputs();
  }
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
    elementsContainer.prepend(drawElement(inputPlaceName.value, inputPlaceLink.value));
    
    closePopup(overlayPlace);
  }
}


function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openPopup= document.querySelector('.page__popup_opened')
    closePopup(openPopup);
  }
}


editProfileButton.addEventListener('click', openPopupEditProfile);
addPlaceButton.addEventListener('click', openPopupAddPlase);

formProfile.addEventListener('submit', profileFormSubmit);
formPlace.addEventListener('submit', placeFormSubmit);


function drawElement(name, link) {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.cloneNode(true);

  const card = element.querySelector('.element');
  const like = card.querySelector('.element__like');
  const basket = card.querySelector('.element__basket');
  const photo = card.querySelector('.element__photo');

  function changeLike() {
    like.classList.toggle('element__like_active');
  }

  function deleteElement() {
    card.remove();
  }

  function fillPhotoData() {
    image.src = photo.src;
    image.alt = name;
    imageName.textContent = name;
  }

  function openImage() {
    fillPhotoData();
    showElement(overlayImage);
    addListenerToDocument();
  }

  photo.addEventListener('click', openImage);
  like.addEventListener('click', changeLike);
  basket.addEventListener('click', deleteElement);

  photo.src = link;
  photo.alt = name;
  card.querySelector('.element__name').textContent = name;

  return element;
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
    elementsContainer.prepend(drawElement(item.name, item.link));
  });
}

drawInitialCards();