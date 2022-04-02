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

const { log } = console;

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

//Объявляем переменную userInfo
const userInfo = new UserInfo({
  name: ".user__name",
  about: ".user__about",
  avatar: ".user__pic",
});

const promises = [api.getUser(), api.getCards()];
const getInfo = Promise.all(promises)
getInfo
  //Сделали запрос, из массива 0(инфо о профиле), получили нужную информацию
  .then((res) => {
    userInfo.setUserInfo(res[0])
    log(res[1])
    //Рендер элементов из массива 1(карточки) полученных с сервера
    cardList = new Section(
      {
        data: res[1],
        renderer: (card) => renderItem(card, false),
      },
      cardContent
    );
    cardList.renderItems();
    //user.id = res[0]._id;

  })
  .catch(err => log("Ошибка при получение данных", err))

//Рендер карточек
function renderItem(card, isNew) {
  // console.log("index - str 164 - renderItem - card", card);
  card = new Card(
    myId,
    card,
    "#card",
    handleLikeCard,
    handleImageOpen,
    openCardDeletePopup,
    deleteCard
  );

  const cardElement = card.generateCard();
  if (isNew) {
    console.log("index 159", isNew);
    cardList.addNewItem(cardElement);
  } else {
    cardList.addItem(cardElement);
  }
}


//
function handleSubmitProfile() {
  console.log("index 378 - start handleSubmitProfile");
  avatarSubmitButton.textContent = "Сохранение...";
  api
    .updateUser({
      name: formUserNameInput.value,
      about: formUserAboutInput.value,
    })
    .then((res) => {
      userInfo.setUserInfo(res)
      popupUser.close(); // Закрыть попап
    })
    .catch((err) => {
      console.log("Ошибка редактирования профиля", err.message);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
}


const popupUser = new PopupWithForm({
  popupSelector: popupFormUser,
  addNewInfoHandler: () => handleSubmitProfile()

});

popupUser.setEventListeners();


// Функция открытия попапа редактирования профиля юзера
function openProfilePopup() {
  console.log("index - str 115 - openProfilePopup");
  formUserNameInput.value = userName.textContent;
  formUserAboutInput.value = userAbout.textContent;
  // openPopup(popupFormUser);
  popupUser.open();
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
      cardList.addItem(cardList)
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
  console.log("index 197 - openCardPopup");
  cardPopup.open();
}


function handleLikeCard(cardLike) {
  const currentCardId = this["_cardId"];
  console.log("index 247 - id карточки", currentCardId);
  if (cardLike.classList.contains("card__heart_liked")) {
    addLike(currentCardId, cardLike);
  } else {
    deleteLike(currentCardId, cardLike);
  }
}
function addLike(currentCardId, cardLike) {
  api
    .addLike(currentCardId)
    .then((card) => likeCounter(card, cardLike))
    .catch((err) => console.log(`Ошибка: ${err}`));
}

function deleteLike(currentCardId, cardLike) {
  api
    .deleteLike(currentCardId)
    .then((card) => likeCounter(card, cardLike))
    .catch((err) => console.log(`Ошибка: ${err}`));
}
function likeCounter(card, cardLike) {
  const showCounter = cardLike
    .closest(".card")
    .querySelector(".card__heart-count");
  showCounter.textContent = card.likes.length;
}

//============ЧТО КАСАЕТСЯ АВАТАРКИ============//

const popupAvatar = new PopupWithForm({
  popupSelector: popupFormAvatar,
  addNewInfoHandler: () => {
    avatarSubmitButton.textContent = "Сохранение...";
    api.updateAvatar({ avatar: avatarLink.value })
      .then(res => {
        userInfo.setUserInfo(res)
        popupAvatar.close();
      })
      .catch((err) => {
        console.log("Ошибка смены аватара", err.message);
      })
      .finally(() => {
        avatarSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
      });

  }
});

popupAvatar.setEventListeners();

function openAvatarPopup() {
  console.log("index 264 - openAvatarPopup");
  avatarLink.value = ""; //Сбросить значения input
  popupAvatar.open();
  // toggleButtonState(cardInputs, avatarSubmitButton, "form__submit_inactive");
}
// Функция обработки смены аватара
//function handleAvatarPopup(evt) {
//  console.log("index 271 - start handleAvatarPopup");
// evt.preventDefault(); // Не открывать в новом окне
//  avatarSubmitButton.textContent = "Сохранение..."; //Поменять значение в кнопке
//  api
//    .updateAvatar({
//      avatar: avatarLink.value,
//    })
//    .then((res) => {
//      userInfo.setUserInfo(res);
//      popupAvatar.close();
//    })
//    .catch((err) => {
//      console.log("Ошибка смены аватара", err.message);
//    })
//    .finally(() => {
//      avatarSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
//    });
//}


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
  console.log("index 324 - openImagePopup", imageOpen.alt);
}

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
//popupFormAvatar.addEventListener("submit", handleAvatarPopup);
popupFormUser.addEventListener("submit", handleSubmitProfile);
cardFormPopup.addEventListener("submit", handleCardFormSubmit);
popupCardDeleteElement.addEventListener("submit", handleCardDelete);


// Функция открытия попапа согласия с удалением карточки
function openCardDeletePopup(cardToDelete) {
  console.log(
    "index 402 - карточка для удаления",
    cardToDelete,
    cardToDelete["_cardId"]
  );
  popupCardDelete.open();
}

const popupCardDelete = new PopupWithForm({
  popupSelector: popupCardDeleteElement,
  addNewInfoHandler: (currentCardId, cardToDelete) =>
    handleCardDelete(currentCardId, cardToDelete),
});

popupCardDelete.setEventListeners();

// Функция обработки согласия с удалением карточки
function handleCardDelete(card) {
  //console.log("index 419 - Показать id карточки", card, card["_cardId"]);
  const currentCardId = card._id;
  console.log('блок карточки', card)
  console.log('id карточки', card._id)
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


