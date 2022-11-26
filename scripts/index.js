const popup = document.querySelector('.popup');
const popupBtnClose = popup.querySelector('.popup__btn-close');
const popupBtnOpen = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__content');
const nameInput = popup.querySelector('.popup__name');
const professionInput = popup.querySelector('.popup__profession');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');


// Открытие попапа
const popupOpen = function  () {
  popup.classList.add('popup_is-opened');
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

// Закрытие попапа
const popupClose = function  () {
  popup.classList.remove('popup_is-opened');
}

// Закрытие попапа при клике вне попапа
const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    retern;
  }
  popupClose();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  popupClose();
}


// Обработчики событий
popupBtnOpen.addEventListener('click', popupOpen);
popupBtnClose.addEventListener('click', popupClose);
popup.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler); 







