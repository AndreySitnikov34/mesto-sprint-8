import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageSelector =
      this._popupsContainer.querySelector(".popup__image");
  }
  //Открывалка выбранной картинки
  open() {
    super.open();
  }
}
