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
  popupImage,
  imageOpen,
  signImage,
  popupCardDeleteElement,
  avatarEditButton,
  avatarSubmitButton,
  userEditButton,
  cardEditButton,
  cardSubmitButton,
  cardContent,
  enableValidationForm,
  config,
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
const api = new Api(config);

let deleteCard;
let cardList;
let userId;
//============ЧТО КАСЕАТСЯ ЮЗЕРА И КАРТОЧЕК============//

//Объявляем переменную userInfo
const userInfo = new UserInfo({
  name: ".user__name",
  about: ".user__about",
  avatar: ".user__pic",
});

const promises = [api.getUser(), api.getCards()];
const getInfo = Promise.all(promises);
getInfo
  //Сделали запрос, из массива 0(инфо о профиле), получили нужную информацию
  .then((res) => {
    userInfo.setUserInfo(res[0]);
    userId = res[0]._id;
    //Сделали запрос, из массива 1(карточки), получили нужную информацию
    cardList = new Section(
      {
        data: res[1],
        renderer: (card) => renderItem(card, false),
      },
      cardContent
    );
    cardList.renderItems();
  })
  .catch((err) => log("Ошибка при получение данных", err));

//Рендер карточек
function renderItem(card, itIsNew) {
  card = new Card(
    userId,
    card,
    "#card",
    handleLikeCard,
    handleImageOpen,
    openCardDeletePopup,
    deleteCard
  );

  const cardElement = card.generateCard();
  if (itIsNew) {
    cardList.addNewItem(cardElement);
  } else {
    cardList.addItem(cardElement);
  }
}

const popupUser = new PopupWithForm({
  popupSelector: popupFormUser,
  addNewInfoHandler: () => {
    console.log("index 105 - start popupUser");
    avatarSubmitButton.textContent = "Сохранение...";
    api
      .updateUser({
        name: formUserNameInput.value,
        about: formUserAboutInput.value,
      })
      .then((res) => {
        userInfo.setUserInfo(res);
        console.log("index 114 - новые данные -", res);
        popupUser.close(); // Закрыть попап
      })
      .catch((err) => {
        console.log("Ошибка редактирования профиля", err.message);
      })
      .finally(() => {
        avatarSubmitButton.textContent = "Сохранить";
      });
  },
});

popupUser.setEventListeners();

// Функция открытия попапа редактирования профиля юзера
function openProfilePopup() {
  console.log("index 130 - openProfilePopup");
  formUserNameInput.value = userName.textContent;
  formUserAboutInput.value = userAbout.textContent;
  popupUser.open();
  userFormValidator.enableValidation();
}

// Функция обработки создания новой карточки

const cardPopup = new PopupWithForm({
  popupSelector: cardFormPopup,
  addNewInfoHandler: () => {
    cardSubmitButton.textContent = "Сохранение..."; //Поменять значение в кнопке
    api
      .postCard({
        name: titleInputCard.value,
        link: linkInputCard.value,
      })
      .then((res) => {
        renderItem(res, res.owner._id); //Отрисовка карточки в разметке
        console.log("index 149 - Карточка добавлена", res);
        cardPopup.close(); //Закрыть попап
      })
      .catch((err) => {
        console.log("Ошибка добавления карточки", err.message);
      })
      .finally(() => {
        cardSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
      });
  },
});

cardPopup.setEventListeners();

function openCardPopup() {
  console.log("index 165 - openCardPopup");
  cardPopup.open();
  cardFormValidator.enableValidation();
}

//============ЧТО КАСАЕТСЯ ЛАЙКОВ============//

//Обработка постановки лайка
function handleLikeCard(cardLike) {
  const currentCardId = this["_cardId"];
  console.log("index 173 - id карточки", currentCardId);
  if (cardLike.classList.contains("card__heart_liked")) {
    addLike(currentCardId, cardLike);
  } else {
    deleteLike(currentCardId, cardLike);
  }
}
//Отдельно функция добавления лайка
function addLike(currentCardId, cardLike) {
  api
    .addLike(currentCardId)
    .then((card) => likeCounter(card, cardLike))
    .catch((err) => console.log(`Ошибка: ${err}`));
}
//Отдельно функция удаления лайка
function deleteLike(currentCardId, cardLike) {
  api
    .deleteLike(currentCardId)
    .then((card) => likeCounter(card, cardLike))
    .catch((err) => console.log(`Ошибка: ${err}`));
}
//Отдельно функция счетчика лайков
function likeCounter(card, cardLike) {
  const showCounter = cardLike
    .closest(".card")
    .querySelector(".card__heart-count");
  showCounter.textContent = card.likes.length;
}

//============ЧТО КАСАЕТСЯ АВАТАРКИ============//

// Обработка смены аватара
const popupAvatar = new PopupWithForm({
  popupSelector: popupFormAvatar,
  addNewInfoHandler: () => {
    avatarSubmitButton.textContent = "Сохранение...";
    api
      .updateAvatar({ avatar: avatarLink.value })
      .then((res) => {
        userInfo.setUserInfo(res);
        console.log("index 213 - новые данные -", res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log("Ошибка смены аватара", err.message);
      })
      .finally(() => {
        avatarSubmitButton.textContent = "Сохранить"; //Поменять значение в кнопке обратно
      });
  },
});

popupAvatar.setEventListeners();

function openAvatarPopup() {
  console.log("index 228 - openAvatarPopup");
  avatarLink.value = ""; //Сбросить значения input
  popupAvatar.open();
  avatarFormValidator.enableValidation();
}

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
  console.log("index 246 - openImagePopup", imageOpen.alt);
}

//Слушатели кликов
avatarEditButton.addEventListener("click", openAvatarPopup);
cardEditButton.addEventListener("click", openCardPopup);
userEditButton.addEventListener("click", openProfilePopup);

// Функция открытия попапа согласия с удалением карточки
function openCardDeletePopup(cardToDelete) {
  console.log(
    "index 268 - карточка для удаления",
    cardToDelete,
    cardToDelete["_cardId"]
  );
  // popupCardDelete.open(cardToDelete);//Удаление через попап
  handleCardDelete(cardToDelete); //Удаление напрямую по клику на корзинку
}

const popupCardDelete = new PopupWithForm({
  popupSelector: popupCardDeleteElement,
  addNewInfoHandler: (currentCardId, cardToDelete) =>
    handleCardDelete(currentCardId, cardToDelete),
});

popupCardDelete.setEventListeners();

// Функция обработки согласия с удалением карточки
function handleCardDelete(cardToDelete) {
  const currentCardId = cardToDelete["_cardId"];
  api
    .deleteCard(currentCardId) //Удаление карточки по id
    .then((evt) => {
      cardToDelete._element.remove(); //Удаление карточки из разметки
      popupCardDelete.close();
    })
    .catch((err) => {
      console.log("Ошибка удаления карточки", err.message);
    });
}

//============ВАЛИДАЦИЯ============//
//Сначала нужно объявить переменные
const cardFormValidator = new FormValidator(
  enableValidationForm,
  cardFormPopup
);

const userFormValidator = new FormValidator(
  enableValidationForm,
  popupFormUser
);

const avatarFormValidator = new FormValidator(
  enableValidationForm,
  popupFormAvatar
);
