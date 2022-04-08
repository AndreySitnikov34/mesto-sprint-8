import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor({popupSelector}) {
    super({popupSelector});
    this._popupImage =
      this._popup.querySelector(".popup__image");
    this._popupSignImage = this._popup.querySelector(".popup__image-alt")
  }
  //Открывалка выбранной картинки
  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupSignImage.textContent = name;
  }
}
