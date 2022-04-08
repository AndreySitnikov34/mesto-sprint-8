export class Popup {
  constructor(popupSelector) {
    // this._popup = document.querySelector(popupSelector);
    this._popupsContainer = popupSelector; //Селектор попапа
    this._handleClickClose = this._handleClickClose.bind(this); //Закрытие по клику
    this._handleEscClose = this._handleEscClose.bind(this); //Закрытие по escape
    this._openEvt = "";
  }
  //Публичный метод открытия попапа
  open(card) {
    this._popupsContainer.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
    this._card = card;
  }

  //Публичный метод закрытия попапа
  close() {
    this._popupsContainer.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  //Приватный метод закрытия по клику
  _handleClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  //Приватный метод закрытия по escape
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Публичный метод, который добавляет слушатель клика иконке закрытия попапа.
  //Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popupsContainer.addEventListener("mousedown", this._handleClickClose);
    this._popupsContainer
      .querySelector(".popup__close")
      .addEventListener("click", this._handleClickClose);
  }
}
