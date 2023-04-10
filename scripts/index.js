import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, formCard, formProfile, config, popups, popupProfile, popupBtnOpenProfile, formElementProfile, nameInput, professionInput, profileName,
profileProfession, popupCard, popupBtnOpenCard, cardContainer, formElementCard, titleInput, linkInput } from "./constants.js"

// Создание карточки с помощью класса
function renderCard(data) {
  const card = new Card(data, '#card-template');
  const photoGridElement = card.generateCard();

  return photoGridElement;
}

// Загрузка карточек на страницу
initialCards.forEach((item) => {
  cardContainer.append(renderCard(item));
});

// Открытие попапа
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
}

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
}

// Закрытие попапа на ESC
const closePopupByKey = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Закрытие попапа при клике на оверлей и при клике на крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if(evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup);
    }
  });                
});

// Открытие попапа Profile
const openPopupProfile = () => {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  openPopup(popupProfile);
  // Сброс ошибок при открытии попапа, задизейблим кнопку сохранения при открытии
  formEditValidator.resetValidation();
}

const openPopupCard = () => {
  //Обнуление полей ввода при открытии
  formCard.reset();
  openPopup(popupCard);
  // Сброс ошибок при открытии попапа, задизейблим кнопку сохранения при открытии
  formAddValidator.resetValidation();
}

//Обработка отправки, введенных в попап Card, данных
function handleSubmitCard (evt) {
  evt.preventDefault();
  const newCardObject = {};
  newCardObject.name = titleInput.value;
  newCardObject.link = linkInput.value;
  cardContainer.prepend(renderCard(newCardObject));
  closePopup(popupCard);
}

//Обработка отправки, введенных в попап Profile, данных
function handleSubmitProfile (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupProfile);
}

// Обработчики событий
popupBtnOpenProfile.addEventListener('click', openPopupProfile);
popupBtnOpenCard.addEventListener('click', openPopupCard);
formElementProfile.addEventListener('submit', handleSubmitProfile);
formElementCard.addEventListener('submit', handleSubmitCard);

// создаем экземпляр класса FormValidator
const formEditValidator = new FormValidator(config, formProfile);
formEditValidator.enableValidation();
// создаем экземпляр класса FormValidator
const formAddValidator = new FormValidator(config, formCard);
formAddValidator.enableValidation();
