export class Api {
  constructor(config) {
    this._url = config["url"];
    this._headers = config["headers"];
    // this.parseResponse = this.parseResponse.bind(this);
  }
  // config = {
  //   url: "https://nomoreparties.co/v1/plus-cohort7",
  //   headers: {
  //     authorization: "01124a9d-ad91-4991-aee6-270006a314f8",
  //     "Content-Type": "application/json",
  //   },
  // };
  //Парсинг ответа
  _parseResponse(res) {
    console.log("приходит ответ 16", res);
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
    }).then((res) => {
      if (res.ok) {
        console.log("Api - str 47", res);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => parseResponse(res));
  }
  //Добавление лайка
  addLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => parseResponse(res));
  }
  //Удаление лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => parseResponse(res));
  }
  //Получение данных о пользователе
  getUser() {
    // console.log("70 строчка !!!");
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
    }).then((res) => {
      if (res.ok) {
        console.log("Api - str 91 -", res);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //Смена аватарки
  updateAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      if (res.ok) {
        console.log("Api - str 105 -", res);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //Смена аватарки (асинхронной функцией) как подсказывает VSCode
  // const updateAvatar = async () => {
  //   try {
  //     const res = await fetch(`${config.url}/users/me/avatar`, {
  //       method: "PATCH",
  //       headers: config.headers,
  //       body: JSON.stringify({ avatar: data.avatar }),
  //     });
  //     return parsResponse(res);
  //   } catch (err) {
  //     console.log(err);
  //     return await Promise.reject(err);
  //   }
  // };
}
