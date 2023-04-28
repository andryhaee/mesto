import Popup from './Popup.js'

class PopupWithConfirmanion extends Popup {
  constructor(popupSelector, handleFormDelete) {
    super(popupSelector);

    this._handleFormDelete = handleFormDelete;
    this._buttonDelete = this._popup.querySelector('.popup__btn-save');
    this._buttonDeleteText = this._buttonDelete.textContent;

  }
  
  renderLoading(isLoading, loadingText = "Удаление...") {
    if (isLoading) {
      this._buttonDelete.textContent = loadingText;
      this._buttonDelete.disabled = true;
      
    } else {
      this._buttonDelete.textContent = this._buttonDeleteText;
      this._buttonDelete.disabled = false;
    }
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._buttonDelete.addEventListener("click", () => {this._handleFormDelete(this, this.cardId)});
  };

  open(card, cardId) {
    super.open();
    this.card = card;
    this.cardId = cardId;
  }
  
  close() {
    super.close();
    this._buttonDelete.removeEventListener("click", this._handleFormDelete);
  }
}

export default PopupWithConfirmanion;
