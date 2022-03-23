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
  popupCardDelete,
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

let cardToDelete;
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
//Получение информации о юзере при загрузке
// getUser()
//   .then((data) => {
//     const userId = data._id;
//     // console.log("Информация по юзеру", data, userId);
//     userName.textContent = data.name;
//     userAbout.textContent = data.about;
//     userPic.src = data.avatar;

//     renderCards(userId);
//   })
//   .catch((err) => {
//     console.log("Ошибка загрузки данных о пользователе", err);
//   });
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

function setUserData(name, about) {
  renderLoader(true, popupFormUser);
  api
    .setUserData(name, about)
    .then((userData) => {
      updateUserInfo(userData);
      userFormPopup.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => renderLoader(false, popupFormUser, "Сохранить"));
}

const userFormPopup = new PopupWithForm({
  popupSelector: popupFormUser,
  addNewInfoHandler: (info) =>
    setUserData(info["first-field"], info["second-field"]),
});

userFormPopup.setEventListeners();

function editUserInfo() {
  const currentUserInfo = userInfo.getUserInfo();
  userFormFirstField.value = currentUserInfo.name;
  userFormSecondField.value = currentUserInfo.job;
  userFormPopup.open();
}
//============ЧТО КАСАЕТСЯ КАРТОЧЕК============//
function getCards() {
  api
    .getCards()
    .then((data) => renderItems(data))
    .catch((err) => {
      console.log("index - str 132 - Ошибка загрузки данных о карточках", err);
    });
}
//Изъятие карточек у сервера
// const renderCards = (userId) => {
//   console.log("render cards");
//   getCards()
//     .then((data) => {
//       console.log("then");
//       data.forEach((card) => {
//         addCard(card, userId);
//       });
//     })
//     .catch((err) => {
//       console.log("Ошибка загрузки контента:", err.message);
//     });
// };

//Рендеринг элементов
function renderItems(initialCards) {
  console.log("index - str 152", initialCards);
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
  console.log("index - str 164 - renderItem - card", card);
  card = new Card(
    myId,
    card,
    "#card"
    // handleCardClick,
    // handleCardDelete,
    // handleCardLike,
    // deleteCard
  );

  const cardElement = card.generateCard();
  if (isNew) {
    console.log("str 176", isNew);
    cardList.addNewItem(cardElement);
  } else {
    cardList.addItem(cardElement);
  }
}

function setNewCard(name, link) {
  console.log("str 183", name, link);
  renderLoader(true, cardFormPopupElement);
  api
    .setNewCard(name, link)
    .then((newCard) => {
      renderCard(
        {
          name: newCard.name,
          link: newCard.link,
          likes: [],
          owner: {
            ["_id"]: myId,
          },
          ["_id"]: newCard["_id"],
        },
        true
      );
      cardFormPopup.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => renderLoader(false, cardFormPopupElement, "Создать"));
}

function deleteCard(cardToDelete) {
  cardToDelete._element.remove();
  cardToDelete._element = null;
}
//Вариант через Api
// function deleteCard(cardToDelete) {
//   const currentCardId = cardToDelete["_cardId"];
//   api
//     .deleteCard(currentCardId)
//     .then((delMessage) => {
//       card.removePlace(cardToDelete);
//       cardDeletePopup.close();
//     })
//     .catch((err) => console.log(`Ошибка: ${err}`));
// }

function handleDeleteCardClick(cardToDelete) {
  cardDeletePopup.open(cardToDelete);
}

// const cardDeletePopup = new PopupWithForm({
//   popupSelector: cardPopupDeleteElement,
//   addNewInfoHandler: (obj, currentCardId, cardToDelete) =>
//     deleteCard(currentCardId, cardToDelete),
// });

// cardDeletePopup.setEventListeners();

const cardPopup = new PopupWithForm({
  popupSelector: cardFormPopup,
  addNewInfoHandler: (card) => setNewCard(card.name, card.link),
});

cardPopup.setEventListeners();

function openCardPopup() {
  openPopup(cardFormPopup);
}

// function openCardPopup() {
//   cardFormPopup.open();
// }

// Функция открытия картинки из карточки
function openImagePopup(evt) {
  imageOpen.src = "";
  imageOpen.src = evt.target.src;
  imageOpen.alt = evt.target.alt;
  signImage.textContent = evt.target.alt;
  openPopup(popupImage);
}
//============ЧТО КАСАЕТСЯ ЛАЙКОВ============//
//Функция добавления/удаления лайка
function likeCard() {
  if (!cardLike.classList.contains("card__heart_liked")) {
    addLike(card._id)
      .then((card) => {
        console.log(card._id);
        cardLike.classList.add("card__heart_liked");
        likeCounter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка добавления лайка", err.message);
      });
  } else {
    deleteLike(card._id)
      .then((card) => {
        cardLike.classList.remove("card__heart_liked");
        likeCounter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка удаления лайка", err.message);
      });
  }
}

//============ЧТО КАСАЕТСЯ АВАТАРКИ============//
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

//============ЧТО КАСАЕТСЯ ПОПАПА КАРТИНКИ============//

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
popupCardDelete.addEventListener("submit", handleCardDelete);

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
avatarEditButton.addEventListener("click", openAvatarPopup);

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
