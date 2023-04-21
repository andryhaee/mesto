import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, popupBtnOpenCard, popupBtnOpenProfile, nameInput, professionInput, config, formProfile, formCard } from "../utils/constants.js"

const сardList = new Section({
	items: initialCards,
	renderer: (data) => {
		const card = createCard(data.name, data.link, '#card-template');
		сardList.addItem(card);
	}
}, '.elements');

сardList.renderItems();

function createCard(name, link, template) {
	const card = new Card(name, link, template, () => popupWithImage.open(link, name));
	return card.generateCard();
};

const userInfo = new UserInfo({
	nameSelector: '.profile__title',
	professionSelector: '.profile__subtitle'
});

const popupWithImage = new PopupWithImage('.popup_menu_image');

popupWithImage.setEventListeners();

const formPopupEditProfile = new PopupWithForm({
	popupSelector: '.popup_menu_profile',
	handleFormSubmit: (data) => {
		userInfo.setUserInfo(data.name, data.profession);
	}
});

formPopupEditProfile.setEventListeners();

const formPopupAddCard = new PopupWithForm({
	popupSelector: '.popup_menu_card',
	handleFormSubmit: (data) => {
		сardList.addItem(createCard(data.title, data.link, '#card-template'));
		formPopupAddCard.close();
	}
});

formPopupAddCard.setEventListeners();

popupBtnOpenProfile.addEventListener('click', () => {
	formPopupEditProfile.open();

	nameInput.value = userInfo.getUserInfo().name;
	professionInput.value = userInfo.getUserInfo().profession;
	// Сброс ошибок при открытии попапа, задизейблим кнопку сохранения при открытии
  formEditValidator.resetValidation();
});

popupBtnOpenCard.addEventListener('click', () => {
	formPopupAddCard.open();
	// Сброс ошибок при открытии попапа, задизейблим кнопку сохранения при открытии
  formAddValidator.resetValidation();
});

// создаем экземпляр класса FormValidator
const formEditValidator = new FormValidator(config, formProfile);
formEditValidator.enableValidation();
// создаем экземпляр класса FormValidator
const formAddValidator = new FormValidator(config, formCard);
formAddValidator.enableValidation();
