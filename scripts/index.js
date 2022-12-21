const popups = document.querySelectorAll('.popup');

// попап профиль
const popupProfile = document.querySelector('.popup_menu_profile');
const popupBtnOpenProfile = document.querySelector('.profile__edit-button');
const formElementProfile = popupProfile.querySelector('.popup__content');
const nameInput = popupProfile.querySelector('.popup__input_value_name');
const professionInput = popupProfile.querySelector('.popup__input_value_profession');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');

// попап Карточки
const popupCard = document.querySelector('.popup_menu_card');
const popupBtnOpenCard = document.querySelector('.profile__add-button');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const formElementCard = popupCard.querySelector('.popup__content');
const titleInput = popupCard.querySelector('.popup__input_value_title');
const linkInput = popupCard.querySelector('.popup__input_value_link');
// попап Изображения(зум)
const popupImg = document.querySelector('.popup_menu_image');
const popupContentImg = popupImg.querySelector('.popup__image');
const popupContentCaption = popupImg.querySelector('.popup__caption');

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
const openPopup = (popup) => {
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
  // Сброс ошибок при открытии попапа
  resetErrorInput();
  resetErrorSpan();
}

// Img zoom
const zoomPicture = (card) => {
  popupContentImg.src = card.link;
  popupContentImg.alt = card.name;
  popupContentCaption.textContent = card.name;
  openPopup(popupImg);
}

// Удаление карточки
const deleteCard = (evt) => {
  evt.target.closest(".element").remove();
}

// Лайк карточки
const likeCard = (evt) => {
  evt.target.classList.toggle('element__like_active');
}

// Создание карточки
const createCard = (card) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode('true');
  cardElement.querySelector('.element__title').textContent = card.name;
  const photoElement = cardElement.querySelector('.element__photo');
  photoElement.src = card.link;
  photoElement.alt = card.name;
  // Btn like
  const likeBtn = cardElement.querySelector('.element__like');
  likeBtn.addEventListener('click', likeCard);
  // Btn delete
  const deleteBtn = cardElement.querySelector('.element__delete');
  deleteBtn.addEventListener('click', deleteCard);
  // Btn zoomImg
  photoElement.addEventListener('click', () => zoomPicture(card));
  // Возвращаем карточку
  return cardElement;
}

// Рендер карточки (добавление)
const renderCard = (card) => {
  cardContainer.append(createCard(card));
}

// Рендер всех карточек
initialCards.forEach(renderCard);

//Обработка отправки, введенных в попап Card, данных
function handleSubmitCard (evt) {
  evt.preventDefault();
  const newCardObject = {};
  newCardObject.name = titleInput.value;
  newCardObject.link = linkInput.value;
  cardContainer.prepend(createCard(newCardObject));
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
