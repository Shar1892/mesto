import '../../pages/index.css';

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

const popupProfile = new PopupWithForm('.overlay_type_profile', (evt, data) => {
  evt.preventDefault();
  userInfo.setUserInfo(data);
  popupProfile.close();
});
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm('.overlay_type_place', (evt,data) => {
  evt.preventDefault();

  const cardList = new Section({
    items: [
      {
        name: data.name,
        link: data.activity
      }
    ],
    renderer: (item) => {
      const card = new Card (item, '#element', popupImage.open.bind(popupImage));
      const cardElement = card.createCard();
    
      cardList.addItem(cardElement);
    }
  }, '.elements');
  cardList.renderItems();

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
});

addPlaceButton.addEventListener('click', () => {
  popupPlace.open({
    name: '',
    activity: ''
  });
  placeFormValidator.clearValidationErrors();
});


const cardList = new Section({
  items: initialCardsList,
  renderer: (item) => {
    const card = new Card (item, '#element', popupImage.open.bind(popupImage));
    const cardElement = card.createCard();

    cardList.addItem(cardElement);
  }
}, '.elements');

cardList.renderItems();