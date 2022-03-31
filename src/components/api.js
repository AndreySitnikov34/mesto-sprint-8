export class Api {
  constructor(config) {
    this._url = config["url"];
    this._headers = config["headers"];
  }
<<<<<<< HEAD
=======
 
>>>>>>> 3409a585a6b62c77f0971d6e5d56ec3bee11e1b8
  //Парсинг ответа
  _parseResponse(res) {
    // console.log("Api - str 16 - приходит ответ", res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
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
<<<<<<< HEAD
    }).then((res) => {
      if (res.ok) {
        console.log("Api - str 31 - PostCard", res);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
=======
    }).then((res) => this._parseResponse(res));
>>>>>>> 3409a585a6b62c77f0971d6e5d56ec3bee11e1b8
  }
  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  //Добавление лайка
  addLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }
  //Удаление лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
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
<<<<<<< HEAD
    }).then((res) => {
      if (res.ok) {
        console.log("Api - str 73 -", res);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
=======
    }).then((res) => this._parseResponse(res));
>>>>>>> 3409a585a6b62c77f0971d6e5d56ec3bee11e1b8
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
