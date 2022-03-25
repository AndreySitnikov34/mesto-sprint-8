//Отрисовка элементов на странице
export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data; //Массив данных, которые нужно добавить на страницу
    //при инициализации класса. Данные приходят из Api
    this._renderer = renderer; //Функция, которая отвечает за создание и отрисовку
    //данных на странице
    this._container = document.querySelector(containerSelector); //Селектор контейнера,
    //в который нужно добавлять созданные элементы
  }

  //Публичный метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach((item) => {
      //Перебор массива
      // console.log("Section - str 16 - item", item);
      this._renderer(item); //Отрисовка каждого отдельного элемента
    });
  }

  //Публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element); //В конец
  }

  addNewItem(element) {
    this._container.prepend(element); //В начало
  }
}
