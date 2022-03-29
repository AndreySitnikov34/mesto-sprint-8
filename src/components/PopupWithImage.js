import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageSelector =
      this._popupsContainer.querySelector(".popup__image");
  }
  //Открывалка выбранной картинки
  open(currentImage) {
    super.open();
    // this._popupImageSelector.src = "";
    // this._popupImageSelector.src = currentImage.src;
    // this._popupImageSelector.alt = currentImage.alt;
  }
}
