import { openPopup } from "./index.js";
import { popupImg, popupContentImg, popupContentCaption } from "./constants.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const photoGridElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return photoGridElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();
    const elementPhoto = this._element.querySelector('.element__photo');
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _handleLikeButtonClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active')
  }

  _handleDeleteButtonClick() {
    this._element.remove()
  }

  _handleElementPhotoClick() {
    popupContentImg.src = this._link;
    popupContentImg.alt = this._name;
    popupContentCaption.textContent = this._name;

    openPopup(popupImg);
  }

  _setEventListener() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeButtonClick();
    })

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    })

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleElementPhotoClick();
    })
  }
}
