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
  popupImage,
  popupCardDeleteElement,
  avatarEditButton,
  avatarSubmitButton,
  userSubmitButton,
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
    // Использовал деструктуризацию, чтобы передать ф-цию добавления лайка
    {
      handleLikeCard: (res) => {
        handleLike(res);
      },
    },
    handleImageOpen,
    openCardDeletePopup
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
    //Указал верную кнопку, теперь текст меняется
    userSubmitButton.textContent = "Сохранение...";
    api
      .updateUser({
        name: formUserNameInput.value,
        about: formUserAboutInput.value,
      })
      .then((res) => {
        userInfo.setUserInfo(res);
        //console.log("index 114 - новые данные -", res);
        popupUser.close(); // Закрыть попап
      })
      .catch((err) => {
        console.log("Ошибка редактирования профиля", err.message);
      })
      .finally(() => {
        userSubmitButton.textContent = "Сохранить";
      });
  },
});

popupUser.setEventListeners();

// Функция открытия попапа редактирования профиля юзера
function openProfilePopup() {
  //Убрал textContent
  const userData = userInfo.getUserInfo();
  formUserNameInput.value = userData.name;
  formUserAboutInput.value = userData.about;
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
  cardPopup.open();
  cardFormValidator.enableValidation();
}

//============ЧТО КАСАЕТСЯ ЛАЙКОВ============//

//Обработка постановки лайка
//переписал ф-цию слил все в одну, вызываем метод класса checkStatusLike(), если true
//делаем запрос на удаление,иначе делаем запрос на добавление лайка
function handleLike(card) {
  const cardID = card.getId();
  if (card.checkStatusLike()) {
    api
      .deleteLike(cardID)
      .then((res) => {
        card.deleteLikeCard(res);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  } else {
    api
      .addLike(cardID)
      .then((res) => card.addLikeCard(res))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
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
  avatarLink.value = ""; //Сбросить значения input
  popupAvatar.open();
  avatarFormValidator.enableValidation();
}

//============ЧТО КАСАЕТСЯ ПОПАПА КАРТИНКИ============//

const openImagePopup = new PopupWithImage(popupImage);

openImagePopup.setEventListeners();

// Функция открытия картинки из карточки
function handleImageOpen(evt) {
  //Исправил замечание связанное с работой данного модального окна
  openImagePopup.open(evt.target);
}

//Слушатели кликов
avatarEditButton.addEventListener("click", openAvatarPopup);
cardEditButton.addEventListener("click", openCardPopup);
userEditButton.addEventListener("click", openProfilePopup);

// Функция открытия попапа согласия с удалением карточки
function openCardDeletePopup(cardToDelete) {
  // popupCardDelete.open(cardToDelete); //Удаление через попап
  handleCardDelete(cardToDelete); //Удаление напрямую по клику на корзинку
}

const popupCardDelete = new PopupWithForm({
  popupSelector: popupCardDeleteElement,
  addNewInfoHandler: (currentCardId, cardToDelete) =>
    handleCardDelete(currentCardId, cardToDelete),
});

popupCardDelete.setEventListeners();

// Функция обработки согласия с удалением карточки
//Чуть-чуть переделал удаление карточки
function handleCardDelete(card) {
  api
    .deleteCard(card.getId()) //Удаление карточки по id
    .then(() => {
      log(card.getId()); //Печать id карточки
      card.removeCard(); //Удаление карточки из разметки
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
