export class Popup {
  constructor({popupSelector}) {
    this._popup = document.querySelector(popupSelector);
    this._handleClickClose = this._handleClickClose.bind(this); //Закрытие по клику
    this._handleEscClose = this._handleEscClose.bind(this); //Закрытие по escape
    this._openEvt = "";
  }
  //Публичный метод открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);

  }

  //Публичный метод закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
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
    this._popup.addEventListener("mousedown", this._handleClickClose);
    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", this._handleClickClose);
  }
}
