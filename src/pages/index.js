// "use strict";
import "./index.css";
import {
  popupFormUser,
  popupFormAvatar,
  cardFormPopup,
  avatarLink,
  formUserNameInput,
  formUserAboutInput,
  avatarEditButton,
  userEditButton,
  cardEditButton,
  cardContent,
  enableValidationForm,
  config,
  popupImage,
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

let cardList;
let userId;
let cardToDelete; //Добавил для удаления карточки

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
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    //Сделали запрос, из массива 1(карточки), получили нужную информацию
    cardList = new Section(
      {
        data: cards,
        renderer: (card) => renderItem(card, false),
      },
      cardContent
    );
    cardList.renderItems();
  })
  .catch((err) => log("Ошибка при получение данных", err));

//Рендер карточек
function renderItem(cardItem, itIsNew) {
  const card = new Card(
    userId,
    cardItem,
    "#card",
    // Использовал деструктуризацию, чтобы передать ф-ции
    {
      handleLikeCard: (res) => {
        handleLike(res);
      },

      handleImageOpen: (_) => openImagePopup.open(cardItem.name, cardItem.link),
      openCardDeletePopup: (card) => {
        cardDeletePopup(card);
      },
    }
  );

  const cardElement = card.generateCard();
  return itIsNew
    ? cardList.addNewItem(cardElement)
    : cardList.addItem(cardElement);
}
//Исправил замечание, где нужно передевать селектор
const popupUser = new PopupWithForm({
  popupSelector: ".popup-form-user",
  handleSubmit: (values) => {
    //Указал верную кнопку, теперь текст меняется
    popupUser.renderLoading(true);
    api
      .updateUser({
        name: values["name-input"],
        about: values["job-input"],
      })
      .then((res) => {
        userInfo.setUserInfo(res);
        popupUser.close(); // Закрыть попап
      })
      .catch((err) => {
        console.log("Ошибка редактирования профиля", err.message);
      })
      .finally(() => {
        popupUser.renderLoading(false);
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
}

// Функция обработки создания новой карточки
//Исправил замечание, где нужно передевать селектор
const cardPopup = new PopupWithForm({
  popupSelector: ".popup-form-card",
  handleSubmit: (values) => {
    cardPopup.renderLoading(true); //Поменять значение в кнопке
    api
      .postCard({
        name: values["text-input"],
        link: values["url-input-card"],
      })
      .then((res) => {
        renderItem(res, res.owner._id); //Отрисовка карточки в разметке
        cardPopup.close(); //Закрыть попап
      })
      .catch((err) => {
        console.log("Ошибка добавления карточки", err.message);
      })
      .finally(() => {
        cardPopup.renderLoading(false); //Поменять значение в кнопке обратно
      });
  },
});

cardPopup.setEventListeners();

function openCardPopup() {
  cardPopup.open();
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
//Исправил замечание, где нужно передевать селектор
const popupAvatar = new PopupWithForm({
  popupSelector: ".popup-form-avatar",
  handleSubmit: (values) => {
    popupAvatar.renderLoading(true);
    api
      .updateAvatar({ avatar: values["url-input-avatar"] })
      .then((res) => {
        userInfo.setUserInfo(res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log("Ошибка смены аватара", err.message);
      })
      .finally(() => {
        popupAvatar.renderLoading(false); //Поменять значение в кнопке обратно
      });
  },
});

popupAvatar.setEventListeners();

function openAvatarPopup() {
  avatarLink.value = ""; //Сбросить значения input
  popupAvatar.open();
}

//============ЧТО КАСАЕТСЯ ПОПАПА КАРТИНКИ============//

const openImagePopup = new PopupWithImage({
  popupSelector: ".popup-image",
});

openImagePopup.setEventListeners();

//Слушатели кликов
avatarEditButton.addEventListener("click", openAvatarPopup);
cardEditButton.addEventListener("click", openCardPopup);
userEditButton.addEventListener("click", openProfilePopup);

// Функция открытия попапа согласия с удалением карточки
function cardDeletePopup(card) {
  cardToDelete = card;
  popupCardDelete.open(); //Удаление через попап
}

const popupCardDelete = new PopupWithForm({
  popupSelector: ".popup-card-delete",
  handleSubmit: (_) => handleCardDelete(),
});

popupCardDelete.setEventListeners();

//Функция для удаления через попап
function handleCardDelete() {
  api
    .deleteCard(cardToDelete.getId()) //Удаление карточки по id
    .then(() => {
      cardToDelete.deleteCard();
      popupCardDelete.close();
    })
    .catch((err) => {
      console.log("Ошибка удаления карточки", err.message);
    });
}

//============ВАЛИДАЦИЯ============//
//Сначала нужно забрать из FormValidator и объявить переменные
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
const forms = [cardFormValidator, userFormValidator, avatarFormValidator];
forms.forEach((form) => form.enableValidation());
