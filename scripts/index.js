const popup = document.querySelector('.popup');
const popupBtnClose = popup.querySelector('.popup__btn-close');
const popupBtnOpen = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__content');
const nameInput = popup.querySelector('.popup__input_value_name');
const professionInput = popup.querySelector('.popup__input_value_profession');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');


// Открытие попапа
const popupOpen = function  () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

// Закрытие попапа
const popupClose = function  () {
  popup.classList.remove('popup_opened');
}

//Обработка отправки введенных в попап данных
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  popupClose();
}


// Обработчики событий
popupBtnOpen.addEventListener('click', popupOpen);
popupBtnClose.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler); 







