import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, addNewInfoHandler }) {
    super(popupSelector);
    this._addNewInfoHandler = addNewInfoHandler;
    this._infoSubmitHandler = this._infoSubmitHandler.bind(this);
  }

  //Сбор данных всех полей формы
  _getInputValues() {
    this._inputList = this._popupsContainer.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  _infoSubmitHandler(evt) {
    evt.preventDefault();
    this._addNewInfoHandler(this._getInputValues());
  }

  //Переустанавливаем слушателей родителя
  setEventListeners() {
    super.setEventListeners();
    this._popupsContainer
      .querySelector(".form")
      //Т.к нужно добавить обработчик сабмита
      .addEventListener("submit", this._infoSubmitHandler);
  }

  //Перезаписываем родительский метод закрытия
  close() {
    super.close();
    //Т.к надо сбросить форму
    this._popupsContainer.querySelector(".form").reset();
  }
}
