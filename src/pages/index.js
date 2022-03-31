// "use strict";
import "./index.css";
import {
  popupFormUser,
  popupFormAvatar,
  cardFormPopup,
  avatarLink,
  formUserNameInput,
  formUserAboutInput,
  titleInputCard,
  linkInputCard,
  userName,
  userAbout,
  userPic,
  cardTemplate,
  formElement,
  cards,
  popupImage,
  imageOpen,
  signImage,
  popupCardDeleteElement,
  myId,
  cardInputs,
  avatarEditButton,
  avatarSubmitButton,
  userEditButton,
  userSubmitButton,
  cardEditButton,
  cardSubmitButton,
  cardContent,
  enableValidation,
} from "../utils/constants.js";

//Все импорты с соответствующих файлов подряд
import { Api } from "../components/Api.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

//Сразу обозначаемся - идентифицируемся
const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: "01124a9d-ad91-4991-aee6-270006a314f8",
    "Content-Type": "application/json",
  },
});

let deleteCard;
let delEvt;
let cardList;
let card;
//============ЧТО КАСЕАТСЯ ЮЗЕРА============//
function getUser() {
  api
    .getUser()
    .then((data) => renderUserInfo(data))
    .catch((err) => {
      console.log("Ошибка загрузки данных о пользователе", err);
    });
}

//Функция рендеринга инфо о юзере
function renderUserInfo(data) {
  userName.textContent = data.name;
  userAbout.textContent = data.about;
  userPic.src = data.avatar;
  userPic.alt = data.name;
}
//Объявляем переменную userInfo
const userInfo = new UserInfo({
  name: ".user__name",
  about: ".user__about",
  avatar: ".user__pic",
});

function updateUserInfo(userData) {
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
  });
}

function updateUser(name, about) {
  // renderLoader(true, popupFormUser);
  api
    .updateUser(name, about)
    .then((userData) => {
      updateUserInfo(userData);
      popupUser.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  // .finally(() => renderPopupUser(false, popupFormUser, "Сохранить"));
}

const popupUser = new PopupWithForm({
  popupSelector: popupFormUser,
  addNewInfoHandler: (info) =>
    updateUser(info["name-input"], info["job-input"]),
});

popupUser.setEventListeners();

function editUserInfo() {
  const currentUserInfo = userInfo.getUserInfo();
  userFormFirstField.value = currentUserInfo.name;
  userFormSecondField.value = currentUserInfo.job;
  userFormPopup.open();
}
// Функция открытия попапа редактирования профиля юзера
function openProfilePopup() {
  console.log("index - str 115 - openProfilePopup");
  formUserNameInput.value = userName.textContent;
  formUserAboutInput.value = userAbout.textContent;
  // openPopup(popupFormUser);
  popupUser.open();
}
//============ЧТО КАСАЕТСЯ КАРТОЧЕК============//
function getCards() {
  api
    .getCards()
    .then((data) => renderItems(data))
    .catch((err) => {
      console.log("index - str 127 - Ошибка загрузки данных о карточках", err);
    });
}

//Рендеринг элементов
function renderItems(initialCards) {
  // console.log("index - str 160", initialCards);
  cardList = new Section(
    {
      data: initialCards,
      renderer: (card) => renderItem(card, false),
    },
    cardContent
  );
  cardList.renderItems();
}

function renderItem(card, isNew) {
  // console.log("index - str 164 - renderItem - card", card);
  card = new Card(
    myId,
    card,
    "#card",
    likeCard,
    // handleLikeCard,
    handleImageOpen,
    deleteCard,
    openCardDeletePopup
  );

  const cardElement = card.generateCard();
  if (isNew) {
    console.log("str 159", isNew);
    cardList.addNewItem(cardElement);
  } else {
    cardList.addItem(cardElement);
  }
}

// Функция обработки создания новой карточки
function handleCardFormSubmit(evt) {
  // console.log("index - str 219 - handleCardFormSubmit", evt);
  // evt.preventDefault();
  cardSubmitButton.textContent = "Сохранение..."; //Поменять значение в кнопке
  api
    .postCard({
      name: titleInputCard.value,
      link: linkInputCard.value,
    })
    .then((res) => {
      console.log("Карточка добавлена", res);
      const card = new Card({ owner });
      cardPopup.close(); //Закрыть попап
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
    });
}

const cardPopup = new PopupWithForm({
  popupSelector: cardFormPopup,
  addNewInfoHandler: (card) => this._postCard(card.name, card.link),
});

cardPopup.setEventListeners();

function openCardPopup() {
  console.log("index - str 197 - openCardPopup");
  cardPopup.open();
}

//============ЧТО КАСАЕТСЯ ЛАЙКОВ============//
//Функция добавления/удаления лайка
function likeCard() {
  const currentCardId = this["_cardId"];
  const cardLike = this.card;
  console.log("index - str 206 - id карточки", currentCardId);
  const isMyCard = cardLike.likes.some(
    (user) => user["_id"] === "9253fda4de1608ef23343856"
  );

  console.log("index 211", isMyCard);
  if (!isMyCard) {
    api
      .addLike(currentCardId)
      .then((card) => {
        console.log(
          "index 216",
          card,
          "количество лайков теперь",
          card.likes.length
        );
        likeCounter(card);
      })
      .catch((err) => {
        console.log("Ошибка добавления лайка", err.message);
      });
    console.log("не моя карточка");
  } else {
    api
      .deleteLike(currentCardId)
      .then((card) => {
        console.log("index 227", card, card.likes.length);
        likeCounter(card);
      })
      .catch((err) => {
        console.log("Ошибка удаления лайка", err.message);
      });
    console.log("моя карточка");
  }
}

function likeCounter(card, currentCardElement) {
  const showCounter = currentCardElement
    .closest(".card")
    .querySelector(".card__heart-count");
  showCounter.textContent = card.likes.length;
}

//============ЧТО КАСАЕТСЯ АВАТАРКИ============//

const popupAvatar = new PopupWithForm({
  popupSelector: popupFormAvatar,
  addNewInfoHandler: (link) => handleAvatarPopup(link.link),
});

popupAvatar.setEventListeners();

function openAvatarPopup() {
  console.log("index - str 258 - openAvatarPopup");
  avatarLink.value = ""; //Сбросить значения input
  popupAvatar.open();
  // toggleButtonState(cardInputs, avatarSubmitButton, "form__submit_inactive");
}
// Функция обработки смены аватара
function handleAvatarPopup(evt) {
  console.log("index - str 265 - start handleAvatarPopup");
  // evt.preventDefault(); // Не открывать в новом окне
  avatarSubmitButton.textContent = "Сохранение..."; //Поменять значение в кнопке
  api
    .updateAvatar({
      avatar: avatarLink.value,
    })
    .then((res) => {
      console.log("Аватар изменён", res);
      userPic.src = avatarLink.value; //Заменить значение src (взять из инпута)
      popupAvatar.close();
    })
    .catch((err) => {
      console.log("Ошибка смены аватара", err.message);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
    });
}

//============RenderPopupAvatar================//

// function renderPopupAvatar(rendering, avatarSubmitButton) {
//   if (rendering) {
//     avatarSubmitButton.textContent = "Сохранение..."; //Поменять значение в кнопке
//   } else {
//     avatarSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
//   }
// }

//============RenderPopupUser================//

// function renderPopupUser(rendering, userSubmitButton) {
//   if (rendering) {
//     userSubmitButton.textContent = "Сохранение..."; //Поменять значение в кнопке
//   } else {
//     userSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
//   }
// }

//============ЧТО КАСАЕТСЯ ПОПАПА КАРТИНКИ============//

const openImagePopup = new PopupWithImage(popupImage);

openImagePopup.setEventListeners();

// Функция открытия картинки из карточки
function handleImageOpen(evt) {
  imageOpen.src = "";
  imageOpen.src = evt.target.src;
  imageOpen.alt = evt.target.alt;
  signImage.textContent = evt.target.alt;
  openImagePopup.open(evt.target);
  console.log("index - str 318 - openImagePopup", imageOpen.alt);
}
//============ЧТО КАСАЕТСЯ ВАЛИДАЦИИ============//
//===Старый код===//

//Включение валидации всех форм
// enableValidation({
//   formSelector: ".form",
//   inputSelector: ".form__input",
//   submitButtonSelector: ".button",
//   inactiveButtonClass: "form__submit_inactive",
//   inputErrorClass: "form__input-error",
//   errorClass: "form__input-error_active",
// });
//Слушатели кликов
document
  .querySelector(".user__overlay")
  .addEventListener("click", openAvatarPopup);
document
  .querySelector(".card__add-button")
  .addEventListener("click", openCardPopup);
document
  .querySelector(".user__info-edit-button")
  .addEventListener("click", openProfilePopup);
//Слушатели сабмитов
popupFormAvatar.addEventListener("submit", handleAvatarPopup);
popupFormUser.addEventListener("submit", handleSubmitProfile);
cardFormPopup.addEventListener("submit", handleCardFormSubmit);
popupCardDeleteElement.addEventListener("submit", handleCardDelete);

//
//Пробую применить Promise.all
// Promise.all([getUser(), getCards()])
//   .then(([userData, cards]) => {
//     const userId = userData._id; // тут установка данных пользователя
//     const cards = cardsData; // и тут отрисовка карточек
//     userName.textContent = user.name;
//     userAbout.textContent = user.about;
//     userPic.src = user.avatar;
//     cards.forEach(function(card))
//     renderCards(card, userId, "prepend");
//   })
//   .catch((err) => {
//     console.log("Ошибка загрузки данных", err); // тут ловим ошибку
//   });
// Самое начало работы сайта
getUser();
getCards();
// renderCards();
//Слушатели кликов
// avatarEditButton.addEventListener("click", openAvatarPopup);

//Функция обработки профиля юзера после submit
function handleSubmitProfile(evt) {
  console.log("index - str 372 - start handleSubmitProfile");
  evt.preventDefault();
  avatarSubmitButton.textContent = "Сохранение...";
  api
    .updateUser({
      name: formUserNameInput.value,
      about: formUserAboutInput.value,
    })
    .then((res) => {
      userName.textContent = res.name; // Присвоить name значение из формы
      userAbout.textContent = res.about; // Присвоить about значение из формы
      popupUser.close(); // Закрыть попап
    })
    .catch((err) => {
      console.log("Ошибка редактирования профиля", err.message);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
}

// Функция открытия попапа согласия с удалением карточки
function openCardDeletePopup(cardToDelete) {
  console.log(
    "index - str 392 - карточка для удаления",
    cardToDelete,
    cardToDelete["_cardId"]
  );
  popupCardDelete.open();
}

const popupCardDelete = new PopupWithForm({
  popupSelector: popupCardDeleteElement,
  addNewInfoHandler: (card, currentCardId, cardToDelete) =>
    handleCardDelete(currentCardId, cardToDelete),
});

popupCardDelete.setEventListeners();

// Функция обработки согласия с удалением карточки
function handleCardDelete(card) {
  console.log("index - str 4 - Показать id карточки", card, this["_cardId"]);
  const currentCardId = card["_cardId"];
  api
    .deleteCard(currentCardId) //Удаление карточки по id
    .then((res) => {
      console.log("then", res);
      card.deleteCard(card);
      popupCardDelete.close();
    })
    .catch((err) => {
      console.log("Ошибка удаления карточки", err.message);
    });
}
