import {
  formElement,
  popupFormUser,
  popupFormAvatar,
  avatarLink,
  formUserNameInput,
  formUserAboutInput,
  userName,
  userAbout,
  userPic,
  cardTemplate,
  cardFormPopup,
  titleInputCard,
  linkInputCard,
  cards,
  popupImage,
  imageOpen,
  signImage,
  popupCardDelete,
} from "../components/constants.js";

import {
  openAvatarPopup,
  handleAvatarPopup,
  handleSubmitProfile,
  openProfilePopup,
  handleCardFormSubmit,
  openCardPopup,
  openImagePopup,
  openCardDeletePopup,
  handleCardDelete,
} from "../components/modal.js";

import {
  config,
  parseResponce,
  getCards,
  postCard,
  deleteCard,
  addLike,
  deleteLike,
  getUser,
  updateUser,
  updateAvatar,
} from "../components/api.js";
//Функция создания новой карточки
export function createCard(card, userId) {
  // console.log("Содержимое карточек", card);
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardLike = cardElement.querySelector(".card__heart");
  const cardDelete = cardElement.querySelector(".card__del");
  const cardLocation = cardElement.querySelector(".card__location");
  const likeCounter = cardElement.querySelector(".card__heart-count");
  cardLocation.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  likeCounter.textContent = card.likes.length;

  // //Показать ведро только на своих карточках
  if (userId !== card.owner._id) {
    // console.log("userId", userId);
    cardDelete.remove();
  }
  //Покарсить свои лайки
  card.likes.forEach((user) => {
    if (user._id === userId) {
      cardLike.classList.add("card__heart_liked");
    }
  });
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
  //Слушатели внутри функции
  cardImage.addEventListener("click", openImagePopup);
  cardLike.addEventListener("click", likeCard);
  cardDelete.addEventListener("click", (evt) => {
    //По клику открываем попап удаления карточки
    // console.log(card);
    openCardDeletePopup(card, evt.target); //Передаем ему карту, и ссылку на объект
    //инициатор события
  });
  //Версия прямого удаления карточки по клику на ведро
  // cardDelete.addEventListener("click", (evt) => {
  //   deleteCard(card._id) //Удаление карточки по id
  //     .then((card) => {
  //       evt.target.closest(".card").remove();
  //     })
  //     .catch((err) => {
  //       console.log("Ошибка удаления карточки", err.message);
  //     });
  // });

  return cardElement;
}
//Функция добавления карточки на сервер
export const addCard = (card, userId) => {
  // console.log("Содержимое карточки", card._id);
  const contentCard = createCard(card, userId);
  cards.append(contentCard);
};
