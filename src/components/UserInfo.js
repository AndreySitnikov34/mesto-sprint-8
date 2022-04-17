//Класс отвечающий за управление информацией о юзере на странице
export class UserInfo {
  constructor(userInfoSelectors) {
    this._userName = document.querySelector(userInfoSelectors.name);
    this._userAbout = document.querySelector(userInfoSelectors.about);
    this._userPic = document.querySelector(userInfoSelectors.avatar);
  }
  //Метод, возвращающий объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      
    };
  }
  //Метод отправляющий данные о юзере на сервер и в разметку
  setUserInfo(info) {
    this._userName.textContent = info.name;
    this._userAbout.textContent = info.about;
    this._userPic.src = info.avatar;
    this._userPic.alt = info.name;
  }
}
