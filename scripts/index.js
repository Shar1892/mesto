const popup = document.querySelector('.popup');

const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const editProfileCloseButton = popup.querySelector('.popup__close_type_profile');
const addPlaceCloseButton = popup.querySelector('.popup__close_type_place');
const imageContainerCloseButton = popup.querySelector('.popup__close_type_image');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity')

const popupEditPrifile = popup.querySelector('.popup__container_type_profile');
const popupAddPlace = popup.querySelector('.popup__container_type_place');

const formProfile = popup.querySelector('.popup__form_type_edit-profile');
const inputUserName = formProfile.querySelector('.popup__input_type_user-name');
const inputActivity = formProfile.querySelector('.popup__input_type_user-activity');
const saveProfileButton = formProfile.querySelector('.popup__save-button_type_profile');

const formPlace = popup.querySelector('.popup__form_type_add-place');
const inputPlaceName = formPlace.querySelector('.popup__input_type_place-name');
const inputPlaceLink = formPlace.querySelector('.popup__input_type_place-link');
const sevePlaceButton = formPlace.querySelector('.popup__save-button_type_place');

const imageContainer = popup.querySelector('.popup__image-contauner');
const image = imageContainer.querySelector('.popup__image');
const imageName = imageContainer.querySelector('.popup__image-name');



function fillInput() {
  inputUserName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
}

function openForm(element) {
  element.classList.add('popup__container_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
}

function openPopupEditPrifile() {
  openPopup();
  openForm(popupEditPrifile);
  fillInput();
}

function openPopupAddPlase() {
  openPopup();
  openForm(popupAddPlace);
}


function closeForm(element) {
  element.classList.remove('popup__container_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function clearPlaceInputs() {
  inputPlaceName.value = '';
  inputPlaceLink.value = '';
}

function closePopupEditPrifile() {
  closeForm(popupEditPrifile);
  closePopup();
}

function closePopupAddPlace() {
  clearPlaceInputs()
  closeForm(popupAddPlace);
  closePopup();
}

function closeImage() {
  imageContainer.classList.remove('popup__image-container_opened');
  closePopup();
}


function profileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputUserName.value;
  profileActivity.textContent = inputActivity.value;

  closePopupEditPrifile();
}

function placeFormSubmit(evt) {
  evt.preventDefault();

  drawElement(inputPlaceName.value, inputPlaceLink.value);
  clearPlaceInputs();
  closePopupAddPlace();
}


editProfileButton.addEventListener('click', openPopupEditPrifile);
addPlaceButton.addEventListener('click', openPopupAddPlase);

editProfileCloseButton.addEventListener('click', closePopupEditPrifile);
addPlaceCloseButton.addEventListener('click', closePopupAddPlace);
imageContainerCloseButton.addEventListener('click', closeImage);

formProfile.addEventListener('submit', profileFormSubmit);
formPlace.addEventListener('submit', placeFormSubmit);


function drawElement(name, link) {
  const elementsContainer = document.querySelector('.elements');
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.cloneNode(true);
  const card = element.querySelector('.element');
  const like = card.querySelector('.element__like');
  const basket = card.querySelector('.element__basket');
  const foto = card.querySelector('.element__foto');

  function changeLike() {
    like.classList.toggle('element__like_active');
  }

  function deleteElement() {
    card.remove();
  }

  function openImage() {
    image.src = foto.src;
    image.alt = name;
    imageName.textContent = name;
    
    openPopup();
    imageContainer.classList.add('popup__image-container_opened');
  }

  foto.addEventListener('click', openImage);
  like.addEventListener('click', changeLike);
  basket.addEventListener('click', deleteElement);

  card.querySelector('.element__foto').src = link;
  card.querySelector('.element__foto').alt = name;
  card.querySelector('.element__name').textContent = name;

  elementsContainer.prepend(element);
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
    drawElement(item.name, item.link);
  });
}

drawInitialCards();