//Класс карточек
export class Card {
  //Передаём в конструктор данные карточки и селектор её template-элемента
  constructor(
    myId,
    card,
    cardSelector,
    handleCardClick,
    handleCardDeleteClick,
    handleCardLike,
    deleteCard
  ) {
    console.log("Card - str 13 -", card, typeof card);
    this._myId = myId;
    console.log("Card - str 14 - Покажи мой Id - ", myId);
    this._owner = card.owner["_id"];
    console.log("Card 16", card.owner["_id"]);
    this._cardId = card["_id"];
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._cardSelector = cardSelector;
    // this._handleCardClick = handleCardClick;
    // this._handleCardDeleteClick = handleCardDeleteClick;
    // this._handleCardLike = handleCardLike;
    // this._deleteCard = deleteCard;
    // this._addFavorite = this._addFavorite.bind(this);
    // this.removeCard = this.removeCard.bind(this);
  }
  //Приватные методы, которые работают с разметкой, устанавливают слушателей событий
  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._addFavoriteElement.addEventListener("click", this._addFavorite);
    this._trashButtonElement.addEventListener("click", () => {
      this._handleCardDeleteClick(this);
    });
  }
  //Приватные методы для каждого обработчика
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _likeCard() {
    const cardLike = this._cardLike;
    cardLike.classList.toggle("card__heart_liked");
    this._handleFavoriteClick(cardLike);
  }
  //Публичный метод, который возвращает полностью работоспособный
  //и наполненный данными элемент карточки
  generateCard() {
    console.log("Card - str - 53", "generateCard");
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__img");
    this._element.querySelector(".card__location").textContent = this._name;
    this._trashButtonElement = this._element.querySelector(".card__del");
    this._cardLike = this._element.querySelector(".card__heart");
    this._element.querySelector(".card__heart-count").textContent =
      this._likes.length;

    // if (this._likes.some((like) => like["_id"] === this._myId)) {
    //     this._addFavoriteElement.classList.add("card__heart_liked");
    // }

    // if (this._owner !== this._myId) {
    //     this._trashButtonElement.classList.remove("card__del");
    // }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    // this._setEventListeners();
    return this._element;

    //Функция создания новой карточки
    // export function createCard(card, userId) {
    //   console.log("Содержимое карточек", card);
    //   const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    //   const cardImage = cardElement.querySelector(".card__img");
    //   const cardLike = cardElement.querySelector(".card__heart");
    //   const cardDelete = cardElement.querySelector(".card__del");
    //   const cardLocation = cardElement.querySelector(".card__location");
    //   const likeCounter = cardElement.querySelector(".card__heart-count");
    //   cardLocation.textContent = card.name;
    //   cardImage.src = card.link;
    //   cardImage.alt = card.name;
    //   likeCounter.textContent = card.likes.length;

    //Покарсить свои лайки
    // card.likes.forEach((user) => {
    //   if (user._id === userId) {
    //     cardLike.classList.add("card__heart_liked");
    //   }
    // });

    //Показать ведро только на своих карточках
    // if (userId !== card.owner._id) {
    //   console.log("userId", userId);
    //   cardDelete.remove();
    // }
  }
  deleteCard(cardToDelete) {
    cardToDelete._element.remove();
    cardToDelete._element = null;
  }
}
//==========Старый код===================//

//Слушатели внутри функции
// cardImage.addEventListener("click", openImagePopup);
// cardLike.addEventListener("click", likeCard);
// cardDelete.addEventListener("click", (evt) => {
//   //По клику открываем попап удаления карточки
//   console.log(card);
//   openCardDeletePopup(card, evt.target); //Передаем ему карту, и ссылку на объект
//   //инициатор события
// });
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

// return cardElement;

//Функция добавления карточки на сервер
export const addCard = (card, userId) => {
  // console.log("Содержимое карточки", card._id);
  const contentCard = createCard(card, userId);
  cards.append(contentCard);
};
