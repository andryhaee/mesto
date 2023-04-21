class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
		this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._element = null;
  }

  _setEventListener() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeButtonClick();
    })

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    })

    this._element.querySelector('.element__photo').addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    )
  }
}

export default Card;
