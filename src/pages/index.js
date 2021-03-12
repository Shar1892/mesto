import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';

import {
  elementSelectors,
  editProfileButton,
  addPlaceButton,
  formProfile,
  formPlace,
  initialCardsList,
} from '../utils/constants.js'



const profileFormValidator = new FormValidator(elementSelectors, formProfile);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(elementSelectors, formPlace);
placeFormValidator.enableValidation();


const popupImage = new PopupWithImage('.overlay_type_image');
popupImage.setEventListeners();

const popupProfile = new PopupWithForm('.overlay_type_profile', (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
});
popupProfile.setEventListeners();

function generateCard(data) {
  const card = new Card (data, '#element', popupImage.open.bind(popupImage));
  const cardElement = card.createCard();
  return cardElement;
}

const popupPlace = new PopupWithForm('.overlay_type_place', (data) => {
    
  cardList.addItem(generateCard(data));

  popupPlace.close();
});
popupPlace.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  activitySelector: '.profile__activity'
});


editProfileButton.addEventListener('click', () => {
  popupProfile.open(userInfo.getUserInfo());
  profileFormValidator.clearValidationErrors();
  profileFormValidator.disabledSubmitButton();
});

addPlaceButton.addEventListener('click', () => {
  popupPlace.open({});
  placeFormValidator.clearValidationErrors();
  placeFormValidator.disabledSubmitButton();
});


const cardList = new Section({
  items: initialCardsList,
  renderer: (item) => {
    cardList.addItem(generateCard(item));
  }
}, '.elements');

cardList.renderItems();