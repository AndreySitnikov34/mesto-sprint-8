import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor({popupSelector}) {
    super({popupSelector});
    this._popupImage =
      this._popup.querySelector(".popup__image");
    this._popupSignImage = this._popup.querySelector(".popup__image-alt")
  }
  //Открывалка выбранной картинки
  open(card) {
    super.open();
    this._popupImage.src = card.src;
    this._popupImage.alt = card.alt;
    this._popupSignImage.textContent = card.alt;
  }
}
