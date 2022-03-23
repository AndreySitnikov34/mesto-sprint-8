export class Popup {
  constructor(popupSelector) {
    this._popupsContainer = popupSelector; //Селектор попапа
    this._handleClickClose = this._handleClickClose.bind(this); //Закрытие по клику
    this._handleEscClose = this._handleEscClose.bind(this); //Закрытие по escape
    this._openEvt = "";
  }
  //Публичный метод открытия попапа
  open(cardToDelete) {
    this._popupsContainer.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
    this._cardToDelete = cardToDelete;
  }
  // Функция открытия попапа
  // export function openPopup(popup) {
  //   popup.classList.add("popup_opened");
  //   document.addEventListener("keydown", closePopEsc);
  // }
  //Публичный метод закрытия попапа
  close() {
    this._popupsContainer.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }
  // Функция закрытия попапа
  // export function closePopup(popup) {
  //   popup.classList.remove("popup_opened");
  //   document.removeEventListener("keydown", closePopEsc);
  // }

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
  //Функция закрытия попапа по Escape
  // export function closePopEsc(key) {
  //   if (key.key === "Escape") {
  //     const popup = document.querySelector(".popup_opened");
  //     closePopup(popup);
  //   }
  // }

  //Публичный метод, который добавляет слушатель клика иконке закрытия попапа.
  //Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popupsContainer.addEventListener("mousedown", this._handleClickClose);
    this._popupsContainer
      .querySelector(".popup__close")
      .addEventListener("mousedown", this._handleClickClose);
  }
}

//Функция (с подсказки BG-review) закрытия ЛЮБЫХ попапов
//по клику на крестик или оверлей
// export const popups = document.querySelectorAll(".popup");

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__close")) {
//       closePopup(popup);
//     }
//   });
// });
///===Прежний код из файла modal.js===///
let cardToDelete;
let delEvt;

function openAvatarPopup() {
  avatarLink.value = ""; //Сбросить значения input
  openPopup(popupFormAvatar);
  toggleButtonState(cardInputs, avatarSubmitButton, "form__submit_inactive");
}
// Функция обработки смены аватара
function handleAvatarPopup(evt) {
  console.log("start handleAvatarPopup");
  evt.preventDefault(); // Не открывать в новом окне
  avatarSubmitButton.textContent = "Сохранение..."; //Поменять значение в кнопке
  updateAvatar({
    avatar: avatarLink.value,
  })
    .then((res) => {
      console.log("Аватар изменён", res);
      userPic.src = avatarLink.value; //Заменить значение src (взять из инпута)
      closePopup(popupFormAvatar);
    })
    .catch((err) => {
      console.log("Ошибка смены аватара", err.message);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
    });
}
//Функция обработки профиля юзера после submit
function handleSubmitProfile(evt) {
  console.log("start handleSubmitProfile");
  evt.preventDefault();
  avatarSubmitButton.textContent = "Сохранение...";
  updateUser({
    name: formUserNameInput.value,
    about: formUserAboutInput.value,
  })
    .then((res) => {
      userName.textContent = res.name; // Присвоить name значение из формы
      userAbout.textContent = res.about; // Присвоить about значение из формы
      closePopup(popupFormUser); // Закрыть попап
    })
    .catch((err) => {
      console.log("Ошибка редактирования профиля", err.message);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
}
// Функция открытия попапа редактирования профиля юзера
function openProfilePopup() {
  formUserNameInput.value = userName.textContent;
  formUserAboutInput.value = userAbout.textContent;
  openPopup(popupFormUser);
}
// Функция обработки создания новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardSubmitButton.textContent = "Сохранение..."; //Поменять значение в кнопке
  postCard({
    name: titleInputCard.value,
    link: linkInputCard.value,
  })
    .then((res) => {
      console.log("Карточка добавлена", res);
      evt.target.reset();
      toggleButtonState(cardInputs, cardSubmitButton, "form__submit_inactive");
      cards.prepend(createCard(res, res.owner._id));
      closePopup(cardFormPopup); //Закрыть попап
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
    });
}

function openCardPopup() {
  openPopup(cardFormPopup);
}

// Функция открытия попапа согласия с удалением карточки
function openCardDeletePopup(card, evtTarget) {
  //Передаем карточку и объект события
  cardToDelete = card;
  delEvt = evtTarget;
  console.log(card);
  openPopup(popupCardDelete);
}
// Функция обработки согласия с удалением карточки
function handleCardDelete() {
  console.log("Показать id карточки", cardToDelete);
  deleteCard(cardToDelete._id) //Удаление карточки по id
    .then((res) => {
      console.log("then", res);
      delEvt.closest(".card").remove();
      // evt.target.closest(".card").remove();
      closePopup(popupCardDelete);
    })
    .catch((err) => {
      console.log("Ошибка удаления карточки", err.message);
    });
}

// // Функция открытия попапа согласия с удалением карточки
// function openCardDeletePopup() {
//   openPopup(popupCardDelete);
// }
// // Функция обработки согласия с удалением карточки
// function handleCardDelete(evt) {
//   console.log("Посмотреть перед удалением", evt);
//   deleteCard(card._id) //Удаление карточки по id
//     .then((card) => {
//       evt.target.closest(".card").remove();
//       closePopup(popupCardDelete);
//     })
//     .catch((err) => {
//       console.log("Ошибка удаления карточки", err.message);
//     });
// }
