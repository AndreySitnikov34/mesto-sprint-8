import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._form = this._popupsContainer.querySelector(".form");
    this._handleSubmit = handleSubmit;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._inputList = this._popupsContainer.querySelectorAll(".form__input");
    this.submitButton = this._form.querySelector(".form__submit");
  }

  //Сбор данных всех полей формы
  _getInputValues() {
    // this._inputList = this._popupsContainer.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues());
  }

  //Переустанавливаем слушателей родителя
  setEventListeners() {
    super.setEventListeners();
    this._form
      //Т.к нужно добавить обработчик сабмита
      .addEventListener("submit", this._handleFormSubmit);
  }

  //Перезаписываем родительский метод закрытия
  close() {
    super.close();
    //Т.к надо сбросить форму
    this._form.reset();
  }

}
