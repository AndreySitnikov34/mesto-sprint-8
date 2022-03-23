export class Api {
  constructor(userCheck) {
    this._url = userCheck["url"];
    this._headers = userCheck["headers"];
    this.parseResponse = this.parseResponse.bind(this);
  }
  // config = {
  //   url: "https://nomoreparties.co/v1/plus-cohort7",
  //   headers: {
  //     authorization: "01124a9d-ad91-4991-aee6-270006a314f8",
  //     "Content-Type": "application/json",
  //   },
  // };
  //Парсинг ответа
  parseResponse(res) {
    console.log("приходит ответ 16", res);
    // if (res.ok) {
    //   return res.json();
    // }
    // return Promise.reject(`Ошибка: ${res.status}`);
  }
  //Вытягиваие карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      console.log("Api getCards - str 27", res);
      // parseResponse(res);
      if (res.ok) {
        console.log("Api Ответ от сервевра - str 30", res);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    }).then((res) => parseResponse(res));
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
    }).then((res) => {
      console.log("Api - str 74 - GET BY USER", res);
      // parseResponse(res);
      if (res.ok) {
        // console.log("Ответ от сервевра 70", res);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //Добавление пользователя
  updateUser({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => parseResponse(res));
  }
  //Смена аватарки
  updateAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => parseResponse(res));
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
