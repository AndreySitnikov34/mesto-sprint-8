//Класс карточек
export class Card {
  //Передаём в конструктор данные карточки и селектор её template-элемента
  constructor(
    userId,
    card,
    cardSelector,
    handleLikeCard,
    handleImageOpen,
    openCardDeletePopup,
    deleteCard
  ) {
    this._userId = userId;
    this._owner = card.owner["_id"];
    this._cardId = card["_id"];
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._cardSelector = cardSelector;
    this._handleLikeCard = handleLikeCard;
    this._handleImageOpen = handleImageOpen;
    this._openCardDeletePopup = openCardDeletePopup;
    this._deleteCard = deleteCard;
    this._addToFavorite = this._addToFavorite.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }
  //Приватные методы, которые работают с разметкой, устанавливают слушателей событий
  _setEventListeners() {
    this._cardLike.addEventListener("click", this._addToFavorite);
    this._cardImage.addEventListener("click", this._handleImageOpen);
    this._cardDelete.addEventListener("click", () => {
      //По клику открываем попап удаления карточки
      console.log("card 33 - клик на ведро");
      this._openCardDeletePopup(this); //Передаем ему карту, и ссылку на объект
      //инициатор события
    });
  }
  //Приватные методы для каждого обработчика
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //Лайки добавление/удаление
  _addToFavorite() {
    const cardLike = this._cardLike; //Это кнопка сердечко
    cardLike.classList.toggle("card__heart_liked"); //Добавить или убрать цвет
    this._handleLikeCard(cardLike);
  }
  //Публичный метод, который возвращает полностью работоспособный
  //и наполненный данными элемент карточки
  generateCard() {
    // console.log("Card - str - 53", "generateCard");
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__img");
    this._element.querySelector(".card__location").textContent = this._name;
    this._cardDelete = this._element.querySelector(".card__del");
    this._cardLike = this._element.querySelector(".card__heart");
    this._element.querySelector(".card__heart-count").textContent =
      this._likes.length;
    //Покрасить свои лайки при загрузке
    if (this._likes.some((like) => like["_id"] === this._userId)) {
      this._cardLike.classList.add("card__heart_liked");
    }
    //Удалить вёдра на несвоих карточках при загрузке
    if (this._owner !== this._userId) {
      this._cardDelete.classList.remove("card__del");
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  //Удаление карточки
  removeCard(cardToDelete) {
    cardToDelete._element.remove();
    cardToDelete._element = null;
  }
}
