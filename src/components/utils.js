// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopEsc);
}

// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopEsc);
}

//Функция (с подсказки BG-review) закрытия ЛЮБЫХ попапов
//по клику на крестик или оверлей
export const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//Функция закрытия попапа по Escape
export function closePopEsc(key) {
  if (key.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}
