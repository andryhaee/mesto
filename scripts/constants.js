export const initialCards = [
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

export const config = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

export const popups = document.querySelectorAll('.popup');
// попап профиль
export const popupProfile = document.querySelector('.popup_menu_profile');
export const popupBtnOpenProfile = document.querySelector('.profile__edit-button');
export const formElementProfile = popupProfile.querySelector('.popup__content');
export const nameInput = popupProfile.querySelector('.popup__input_value_name');
export const professionInput = popupProfile.querySelector('.popup__input_value_profession');
export const profileName = document.querySelector('.profile__title');
export const profileProfession = document.querySelector('.profile__subtitle');
export const formProfile = document.querySelector('.profile-form');
// попап Карточки
export const popupCard = document.querySelector('.popup_menu_card');
export const popupBtnOpenCard = document.querySelector('.profile__add-button');
export const cardContainer = document.querySelector('.elements');
export const formElementCard = popupCard.querySelector('.popup__content');
export const titleInput = popupCard.querySelector('.popup__input_value_title');
export const linkInput = popupCard.querySelector('.popup__input_value_link');
export const formCard = document.querySelector('.card-form');
// попап Изображения(зум)
export const popupImg = document.querySelector('.popup_menu_image');
export const popupContentImg = popupImg.querySelector('.popup__image');
export const popupContentCaption = popupImg.querySelector('.popup__caption');
