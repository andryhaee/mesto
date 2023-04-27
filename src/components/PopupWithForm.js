import Popup from './Popup.js'

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
	  this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._buttonSubmit = this._popup.querySelector('.popup__btn-save');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  };

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });

    return formValues;
  };

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    isLoading ? this._buttonSubmit.textContent = loadingText : this._buttonSubmit.textContent = this._buttonSubmitText;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  };

  close () {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
