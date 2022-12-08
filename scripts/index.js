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

const popup = document.querySelector('.popup');
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

// Открытие попапа Profile
const popupOpenProfile = function  () {
  popupProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

// Открытие попапа Card
const popupOpenCard = function () {
  popupCard.classList.add('popup_opened');
}

// Закрытие попапов
const popupClose = function  () {
  popupProfile.classList.remove('popup_opened');
  popupCard.classList.remove('popup_opened');
  popupImg.classList.remove('popup_opened');
}

//Обработка отправки, введенных в попап Profile, данных
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  popupClose();
}

// Открытие попапа Img
const popupOpenImg = function () {
  popupImg.classList.add('popup_opened');
}

// Img zoom
const zoomPicture = function (evt) {
  popupOpenImg();
  const imageName = evt.target.closest(".element").querySelector(".element__title").textContent;
  popupContentImg.src = evt.target.src; 
  popupContentImg.alt = imageName;
  popupContentCaption.textContent = imageName;
}

// Добавление карточки
const renderCard = (item) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode('true');
  cardElement.querySelector('.element__title').textContent = item.name;
  const photoElement = cardElement.querySelector('.element__photo');
  photoElement.src = item.link;
  photoElement.alt = item.name;
  // Btn like
  const likeBtn = cardElement.querySelector('.element__like');
  likeBtn.addEventListener('click', (evt) => {evt.target.classList.toggle('element__like_active')});
  // Btn delete
  const deleteBtn = cardElement.querySelector('.element__delete');
  deleteBtn.addEventListener('click', (evt) => {evt.target.parentElement.remove()});
  // Btn zoomImg
  photoElement.addEventListener('click', zoomPicture);
  cardContainer.append(cardElement);
  return cardElement;
}

// Рендер всех карточек
initialCards.forEach(renderCard);

//Обработка отправки, введенных в попап Card, данных
function formSubmitHandlerCard (evt) {
  evt.preventDefault();
  const newCardObject = {};
  newCardObject.name = titleInput.value;
  newCardObject.link = linkInput.value;
  cardContainer.prepend(renderCard(newCardObject));
  //Обнуление полей ввода после добавления
  titleInput.value = '';
  linkInput.value = '';
  popupClose();
}

// Обработчики событий
popupBtnOpenProfile.addEventListener('click', popupOpenProfile);
popupBtnOpenCard.addEventListener('click', popupOpenCard);
popupBtnCloseProfile.addEventListener('click', popupClose);
popupBtnCloseCard.addEventListener('click', popupClose);
popupBtnCloseImg.addEventListener('click', popupClose);
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);
formElementCard.addEventListener('submit', formSubmitHandlerCard);











