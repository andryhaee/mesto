export const config = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// попап профиль
export const popupBtnOpenProfile = document.querySelector('.profile__edit-button');
export const formProfile = document.querySelector('.profile-form');
// попап Карточки
export const popupCard = document.querySelector('.popup_menu_card');
export const popupBtnOpenCard = document.querySelector('.profile__add-button');
export const formCard = document.querySelector('.card-form');
// попап Аватар
export const formAvatar = document.querySelector('.avatar-form');
export const popupBtnOpenAvatar = document.querySelector('.profile__avatar-edit');
