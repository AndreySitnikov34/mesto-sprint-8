export class FormValidator {
  //Принимаем в конструктор объект настроек с селекторами и классами формы,
  //а вторым параметром попап
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }
  //Приватные методы обработки формы

  //Функция демонстрации ошибки в инпуте
  _showInputError(inputElement, errorMessage, errorElement) {
    errorElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }
  //Функция сокрытия ошибки ввода
  _hideInputElement(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
  }
  //Функция скрывает элемент ошибки
  hideInputError(inputElement, errorElement) {
    this._hideInputElement(inputElement);
    this._hideErrorElement(errorElement);
  }
  //Функция убирает текст ошибки
  _hideErrorElement(errorElement) {
    errorElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  }

  //Функция проверки инпута на  НЕвалидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //Проверка валидности поля
  _checkInputValidity(inputElement) {
    //Добавим переменную
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        errorElement
      );
    } else {
      this.hideInputError(inputElement, errorElement);
    }
  }
  //Функция не активности сабмита
  disableButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disable = true;
  }
  //Функция активности сабмита
  enableButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disable = false;
  }
  //Метод gennady-bars
  _resetValidation() {
    this._toggleButtonState(); //<== управляем кнопкой ==
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement); //<==очищаем ошибки ==
    });
  }
  //Принять поля ввода и перекрасить кнопку
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  //Функция очистки спанов после клика на кнопку
  _clearErrorMessages() {
    const errorMessages = this._form.querySelectorAll(
      this._errorMessageSelector
    );
    errorMessages.forEach((node) =>
      node.classList.remove(this._inputErrorClass)
    );
  }

  //Новый вариант seEventListeners
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); //Валидность инпута
        this._toggleButtonState(); //Активность сабмита
      });
    });
    this._toggleButtonState(); //Активность сабмита
  }

  //Публичный метод включения валидации форм
  enableValidation() {
    this._setEventListeners();
  }
}
