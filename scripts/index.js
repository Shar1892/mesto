const overlay = document.querySelector('.overlay');

const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const editProfileCloseButton = overlay.querySelector('.overlay__close_type_profile');
const addPlaceCloseButton = overlay.querySelector('.overlay__close_type_place');
const imageContainerCloseButton = overlay.querySelector('.overlay__close_type_image');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity')

const elementsContainer = document.querySelector('.elements');

const popupEditProfile = overlay.querySelector('.overlay__container_type_profile');
const popupAddPlace = overlay.querySelector('.overlay__container_type_place');

const formProfile = overlay.querySelector('.overlay__form_type_edit-profile');
const inputUserName = formProfile.querySelector('.overlay__input_type_user-name');
const inputActivity = formProfile.querySelector('.overlay__input_type_user-activity');

const formPlace = overlay.querySelector('.overlay__form_type_add-place');
const inputPlaceName = formPlace.querySelector('.overlay__input_type_place-name');
const inputPlaceLink = formPlace.querySelector('.overlay__input_type_place-link');

const imageContainer = overlay.querySelector('.overlay__image-contauner');
const image = imageContainer.querySelector('.overlay__image');
const imageName = imageContainer.querySelector('.overlay__image-name');


function fillInput() {
  inputUserName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
}


function showElement(element) {
  element.classList.add('page__popup_opened');
}


function openPopup(evt) {
  if (evt.target === editProfileButton) {
    showElement(overlay);
    showElement(popupEditProfile);
    fillInput();
  } else if (evt.target === addPlaceButton) {
    showElement(overlay);
    showElement(popupAddPlace);
  }
}


function closeElement(element) {
  element.classList.remove('page__popup_opened');
}

function clearPlaceInputs() {
  formPlace.reset();
}

function closePopup(evt) {
  if (evt.target === editProfileCloseButton || evt.target === formProfile) {
    closeElement(popupEditProfile);
    closeElement(overlay);
  } else if (evt.target === addPlaceCloseButton || evt.target === formPlace) {
    clearPlaceInputs();
    closeElement(popupAddPlace);
    closeElement(overlay);
  } else if (evt.target === imageContainerCloseButton) {
    closeElement(imageContainer);
    closeElement(overlay);
  }
}


function profileFormSubmit(evt) {
  console.log(evt.target);
  evt.preventDefault();

  profileName.textContent = inputUserName.value;
  profileActivity.textContent = inputActivity.value;

  closePopup(evt);
}

function placeFormSubmit(evt) {
  evt.preventDefault();

  elementsContainer.prepend(drawElement(inputPlaceName.value, inputPlaceLink.value));
  clearPlaceInputs();
  closePopup(evt);
}


editProfileButton.addEventListener('click', openPopup);
addPlaceButton.addEventListener('click', openPopup);

editProfileCloseButton.addEventListener('click', closePopup);
addPlaceCloseButton.addEventListener('click', closePopup);
imageContainerCloseButton.addEventListener('click', closePopup);

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

  function openImage() {
    image.src = photo.src;
    image.alt = name;
    imageName.textContent = name;
    
    showElement(overlay);
    showElement(imageContainer);
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