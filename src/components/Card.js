class Card {
  constructor(id, data, templateSelector, handleCardClick, handleCardPopupDelete, putLikeHandler, deleteLikeHandler) {
    this.userId = id;
    this.putLike = putLikeHandler;
    this.deleteLike = deleteLikeHandler;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardPopupDelete = handleCardPopupDelete;
    this._data = data;
    this.likes = data.likes;
    this._cardId = this._data._id;
  }

  _getTemplate() {
    this._photoGridElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return this._photoGridElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this.userId !== this._data.owner._id ? this._element.querySelector('.element__delete').style.display = 'none' : '';

    this._setEventListener();

    this.likes.some(item => {
      return item._id === this.userId;
    }) ? this._element.querySelector('.element__like').classList.add('element__like_active') : '';

    if (this.likes) {
      this._element.querySelector('.element__like-counter').textContent = this.likes.length;
      
    }

    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _handleLikeButtonClick(res) {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
    this._element.querySelector('.element__like-counter').textContent = res.likes.length;
  }

  getId() {
    return this._cardId;
  }

  toggleLike() {
    !this._element.querySelector('.element__like').classList.contains('element__like_active') ? this.putLike(this) : this.deleteLike(this);
  }

  _setEventListener() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this.toggleLike(this);
    });

    this._element.querySelector('.element__delete') ? this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardPopupDelete(this._cardId, this._element);
    }) : '';

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick(this)
      console.log(this);
    })
  }
}

export default Card;
