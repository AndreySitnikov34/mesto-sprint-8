export class Api {
  constructor(config) {
    this._url = config["url"];
    this._headers = config["headers"];
  }

  //Парсинг ответа
  _parseResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  //Вытягиваие карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  //Добавление своей карточки
  postCard(card) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => this._parseResponse(res));
  }
  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  //Добавление лайка
  addLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  //Удаление лайка
  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  //Получение данных о пользователе
  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  //Добавление пользователя
  updateUser({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._parseResponse(res));
  }
  //Смена аватарки
  updateAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => this._parseResponse(res));
  }
}
