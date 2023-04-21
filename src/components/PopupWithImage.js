import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupContentImg = this._popup.querySelector('.popup__image');
    this._popupContentCaption = this._popup.querySelector('.popup__caption');
  }

  open(link, name) {
    super.open();
    this._popupContentImg.src = link;
    this._popupContentImg.alt = name;
    this._popupContentCaption.textContent = name;
  }
}

export default PopupWithImage;
