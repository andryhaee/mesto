import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupDelete from '../components/PopupDelete.js';
import { api } from '../components/Api';

import { popupBtnOpenCard, popupBtnOpenProfile, config, formProfile, formCard, formAvatar, popupBtnOpenAvatar } from "../utils/constants.js"

const userInfo = new UserInfo({
  name: '.profile__title',
  about: '.profile__subtitle',
  avatar: '.profile__avatar'
});

const popupWithImage = new PopupWithImage('.popup_menu_image');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    сardList.renderItems(initialCards);
  })
  .catch(console.log);

function createCard(res) {
  const card = new Card(userInfo.userId, res, '#card-template', (evt) => popupWithImage.open(evt), (cardId, card) => popupDelete.open(cardId, card), putLike, deleteLike);
  return card.generateCard();
};

const сardList = new Section(
  (res) => {
    const card = createCard(res);
    сardList.addItem(card);
  }, '.elements');

const putLike = (card) => {
  api.putLike(card.getId())
    .then((res) => {
      card._handleLikeButtonClick(res);
    })
    .catch(console.log);
};

const deleteLike = (card) => {
  api.deleteLike(card.getId())
    .then((res) => {
      card._handleLikeButtonClick(res);
    })
    .catch(console.log);
};

// Попап профиля
const formPopupEditProfile = new PopupWithForm('.popup_menu_profile', (item) => {
  formPopupEditProfile.renderLoading(true);
  api.patchUserInfo(item)
    .then((data) => {
	  userInfo.setUserInfo(data);
    })
    .finally(() => {
	  formPopupEditProfile.renderLoading(false);
      
    })
    .catch(console.log);
});

// Открытие попапа профиля
popupBtnOpenProfile.addEventListener('click', () => {
  formPopupEditProfile.open();
  formPopupEditProfile.setInputValues(userInfo.getUserInfo());
  // Сброс ошибок при открытии попапа
  formEditValidator.resetValidation();
});


// Попап добавления карточек
const formPopupAddCard = new PopupWithForm('.popup_menu_card', (item) => {
  formPopupAddCard.renderLoading(true);
  api.postNewCard(item)
    .then((res) => {
	  formPopupAddCard.close();
      сardList.addItemNew(createCard(res));
    })
    .catch(console.log)
    .finally(() => {
		formPopupAddCard.renderLoading(false);
    });
});

// Открытие попапа добавления карточек
popupBtnOpenCard.addEventListener('click', () => {
  formPopupAddCard.open();
  // Сброс ошибок при открытии попапа, задизейблим кнопку сохранения при открытии
  formAddValidator.resetValidation();
});

// Попап удаления карточек
const popupDelete = new PopupDelete('.popup_delete', () => {
  popupDelete.renderLoading(true);
  api.deleteCard(popupDelete.cardId)
    .then(() => {
      popupDelete.card.remove();
      popupDelete.close();
    })
    .finally(() => {
      popupDelete.renderLoading(false);
    })
    .catch(console.log);
  }
);

// Попап аватар
const formPopupEditAvatar = new PopupWithForm('.popup_menu_avatar', ({ avatar }) => {
  formPopupEditAvatar.renderLoading(true);
  api.patchUserAvatar({ avatar })
    .then(res => {
	  userInfo.setUserInfo(res);
      formPopupEditAvatar.close();
    })
    .finally(() => {
	  formPopupEditAvatar.renderLoading(false);
    })
    .catch(console.log);
});

// Открытие попапа аватар
popupBtnOpenAvatar.addEventListener('click', () => {
  formPopupEditAvatar.open();
  // Сброс ошибок при открытии попапа, задизейблим кнопку сохранения при открытии
  formEditAvatarValidator.resetValidation();
});

formPopupEditProfile.setEventListeners();
formPopupAddCard.setEventListeners();
popupWithImage.setEventListeners();
popupDelete.setEventListeners();
formPopupEditAvatar.setEventListeners();

// создаем экземпляр класса FormValidator
const formEditValidator = new FormValidator(config, formProfile);
formEditValidator.enableValidation();
// создаем экземпляр класса FormValidator
const formAddValidator = new FormValidator(config, formCard);
formAddValidator.enableValidation();
// создаем экземпляр класса FormValidator
const formEditAvatarValidator = new FormValidator(config, formAvatar);
formEditAvatarValidator.enableValidation();
