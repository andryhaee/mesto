import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, formCard, formProfile, config, popups, popupProfile, popupBtnOpenProfile, formElementProfile, nameInput, professionInput, profileName,
profileProfession, popupCard, popupBtnOpenCard, cardContainer, formElementCard, titleInput, linkInput, popupBtnSave } from "./constants.js"

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

// Cброс ошибки в инпуте при открытии попапа
const resetErrorInput = () => { 
  const popupErrorInput = Array.from(document.querySelectorAll('.popup__input'));
  popupErrorInput.forEach((errorinput) => {
    errorinput.classList.remove('popup__input_type_error');
  })
}

// Cброс ошибки в спане при открытии попапа
const resetErrorSpan = () => { 
  const popupErrorSpan = Array.from(document.querySelectorAll('.popup__error'));
  popupErrorSpan.forEach((errorspan) => {
    errorspan.textContent = '';
  })
}

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
  // Сброс ошибок при открытии попапа
  resetErrorInput();
  resetErrorSpan();
}

const openPopupCard = () => {
  //Обнуление полей ввода при открытии
  titleInput.value = '';
  linkInput.value = '';
  openPopup(popupCard);
  // Задизейблим кнопку сохранения при открытии, чтобы нельзя было добавлять пустые карточки после успешного сабмита
  popupBtnSave.classList.add('popup__btn-save_disabled');
  popupBtnSave.setAttribute('disabled', true);
  // Сброс ошибок при открытии попапа
  resetErrorInput();
  resetErrorSpan();
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
