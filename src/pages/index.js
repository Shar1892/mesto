import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

import {PopupWithConfirm} from '../components/PopupWithConfirm.js';

import {
  elementSelectors,
  editProfileButton,
  addPlaceButton,
  formProfile,
  formPlace,
  formAvatar,
  avatarHover,
} from '../utils/constants.js';


const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21/',
  headers: {
    authorization: '9e9ee6a6-2333-4c7f-803c-855145e76f95',
    'Content-Type': 'application/json'
  }
}

const api = new Api(options);



const profileFormValidator = new FormValidator(elementSelectors, formProfile);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(elementSelectors, formPlace);
placeFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(elementSelectors, formAvatar);
avatarFormValidator.enableValidation()


const popupImage = new PopupWithImage('.overlay_type_image');
popupImage.setEventListeners();

const popupProfile = new PopupWithForm('.overlay_type_profile', (data) => {
  
  api.setUserData(data)
    .then((res) => {
      userInfo.setUserInfo(res);

      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.changeButtonText('Сохранение...');
      
    });
  
});
popupProfile.setEventListeners();


const popupAvatar = new PopupWithForm('.overlay_type_avatar', (data) => {

  api.setUserAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);

      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.changeButtonText('Сохранение...');
    });

});
popupAvatar.setEventListeners();


const popupImageRemove = new PopupWithConfirm('.overlay_type_image-remove', (data) => {

  api.removeCard(data.id)
    .then(() => {
      data.element.remove();
      popupImageRemove.close();
    })
    .catch((err) => {
      console.log(err);
    });

}, api);
popupImageRemove.setEventListeners();


const generateCard = (...args) => new Card(...args);

const popupPlace = new PopupWithForm('.overlay_type_place', (data) => {

  api.createCard(data)
    .then((res) => {

      generateCard(res, '#element', popupImage.open.bind(popupImage), popupImageRemove, api, userInfo.id).showCard('.elements');

      popupPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.changeButtonText('Создать');
    });
  
});
popupPlace.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  activitySelector: '.profile__activity',
  avatarSelector: '.profile__avatar'
}, api);


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


avatarHover.addEventListener('click', () => {
  popupAvatar.open(userInfo.getUserInfo());

  avatarFormValidator.clearValidationErrors();
  avatarFormValidator.disabledSubmitButton();
})



Promise.all([
  api.getUser(),
  api.getCards()
])
  .then(([userData, initalCards]) => {
    userInfo.showUserInfo(userData);

    const cardList = new Section(initalCards, (item) => {
      const cardElement = generateCard(item, '#element', popupImage.open.bind(popupImage), popupImageRemove, api, userInfo.id).createCard();
      cardList.addItem(cardElement);
    }, '.elements');
    
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });