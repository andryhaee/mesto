// Массив с готовыми карточками
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

// попап профиль
const popupProfile = document.querySelector('.popup_menu_profile');
const popupBtnOpenProfile = document.querySelector('.profile__edit-button');
const formElementProfile = popupProfile.querySelector('.popup__content');
const nameInput = popupProfile.querySelector('.popup__input_value_name');
const professionInput = popupProfile.querySelector('.popup__input_value_profession');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');
const popupBtnCloseProfile = popupProfile.querySelector('.popup__btn-close');
// попап Карточки
const popupCard = document.querySelector('.popup_menu_card');
const popupBtnOpenCard = document.querySelector('.profile__add-button');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const popupBtnCloseCard = popupCard.querySelector('.popup__btn-close');
const formElementCard = popupCard.querySelector('.popup__content');
const titleInput = popupCard.querySelector('.popup__input_value_title');
const linkInput = popupCard.querySelector('.popup__input_value_link');
// попап Изображения(зум)
const popupImg = document.querySelector('.popup_menu_image');
const popupContentImg = popupImg.querySelector('.popup__image');
const popupContentCaption = popupImg.querySelector('.popup__caption');
const popupBtnCloseImg = popupImg.querySelector('.popup__btn-close');

// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

// Открытие попапа Profile
const openPopupProfile = () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

// Img zoom
const zoomPicture = (evt) => {
  openPopup(popupImg);
  const imageName = evt.target.closest(".element").querySelector(".element__title").textContent;
  popupContentImg.src = evt.target.src;
  popupContentImg.alt = imageName;
  popupContentCaption.textContent = imageName;
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
const createCard = (item) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode('true');
  cardElement.querySelector('.element__title').textContent = item.name;
  const photoElement = cardElement.querySelector('.element__photo');
  photoElement.src = item.link;
  photoElement.alt = item.name;
  // Btn like
  const likeBtn = cardElement.querySelector('.element__like');
  likeBtn.addEventListener('click', likeCard);
  // Btn delete
  const deleteBtn = cardElement.querySelector('.element__delete');
  deleteBtn.addEventListener('click', deleteCard);
  // Btn zoomImg
  photoElement.addEventListener('click', zoomPicture);
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
function formSubmitHandlerCard (evt) {
  evt.preventDefault();
  const newCardObject = {};
  newCardObject.name = titleInput.value;
  newCardObject.link = linkInput.value;
  cardContainer.prepend(createCard(newCardObject));
  //Обнуление полей ввода после добавления
  titleInput.value = '';
  linkInput.value = '';
  closePopup(popupCard);
}

//Обработка отправки, введенных в попап Profile, данных
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupProfile);
}

// Обработчики событий
popupBtnOpenProfile.addEventListener('click', openPopupProfile);
popupBtnOpenCard.addEventListener('click', () => openPopup(popupCard));
popupBtnCloseProfile.addEventListener('click', () => closePopup(popupProfile));
popupBtnCloseCard.addEventListener('click', () => closePopup(popupCard));
popupBtnCloseImg.addEventListener('click', () => closePopup(popupImg));
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);
formElementCard.addEventListener('submit', formSubmitHandlerCard);











