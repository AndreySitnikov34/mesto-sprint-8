const config = {
  url: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: "01124a9d-ad91-4991-aee6-270006a314f8",
    "Content-Type": "application/json",
  },
};
//Парсинг ответа
const parseResponse = (res) => {
  if (res.ok) {
    // console.log("Ответ от сервевра", res);
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
//Вытягиваие карточек с сервера
export const getCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  }).then((res) => parseResponse(res));
};
//Добавление своей карточки
export const postCard = (card) => {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => parseResponse(res));
};
//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => parseResponse(res));
};
//Добавление лайка
export const addLike = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => parseResponse(res));
};
//Удаление лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => parseResponse(res));
};
//Получение данных о пользователе
export const getUser = () => {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers,
  }).then((res) => parseResponse(res));
};
//Добавление пользователя
export const updateUser = ({ name, about }) => {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then((res) => parseResponse(res));
};
//Смена аватарки
export const updateAvatar = ({ avatar }) => {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => parseResponse(res));
};
//Смена аватарки (асинхронной функцией) как подсказывает VSCode
// export const updateAvatar = async () => {
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
