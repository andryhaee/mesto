import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupContentImg = this._popup.querySelector('.popup__image');
    this._popupContentCaption = this._popup.querySelector('.popup__caption');
  }

  open({_name, _link}) {
    super.open();
    this._popupContentImg.src = _link;
    this._popupContentImg.alt = _name;
    this._popupContentCaption.textContent = _name;
  }
}

export default PopupWithImage;
