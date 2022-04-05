export class FormValidator {
  //Принимаем в конструктор объект настроек с селекторами и классами формы,
  //а вторым параметром попап
  constructor(enableValidationForm, popup) {
    this._formSelector = popup;
    this._inputSelector = enableValidationForm["inputSelector"];
    this._submitButtonSelector = enableValidationForm["submitButtonSelector"];
    this._errorMessageSelector = enableValidationForm["errorMessageSelector"];
    this._inactiveButtonClass = enableValidationForm["inactiveButtonClass"];
    this._inputErrorClass = enableValidationForm["inputErrorClass"];
    this._avatarEditButton = enableValidationForm["avatarEditButton"];
    this._userEditButton = enableValidationForm["userEditButton"];
    this._cardEditButton = enableValidationForm["cardEditButton"];
  }
  //Приватные методы обработки формы

  //Проверка валидности поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  //Функция демонстрации ошибки в инпуте
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.nextElementSibling;
    console.log(
      "str 59",
      "инпут -",
      formElement,
      "span - ",
      errorElement,
      "сообщение - ",
      errorMessage
    );
    errorElement.classList.add(this._inputErrorClass);
  }
  //Функция сокрытия ошибки ввода
  _hideInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.nextElementSibling;
    console.log(
      "str 86",
      "инпут -",
      formElement,
      "span - ",
      errorElement,
      "сообщение - ",
      errorMessage
    );
    errorElement.classList.remove(this._inputErrorClass);
  }
  //Функция проверки инпута на  НЕвалидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Изменить состояние кнопки сабмита
  _toggleButtonState(inputList) {
    console.log("114 - toggleButtonState запущена");
    const buttonElement = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    //Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass); //Покрасить в другой цвет
      buttonElement.disabled = true; //Деактиватор кнопки
      console.log(
        "FV 113 - Кнопка submit НЕ АКТИВНА",
        buttonElement,
        inputList
      );
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
      console.log("FV 117 - Кнопка submit активна", buttonElement, inputList);
    }
  }
  //Функция очистки спанов после клика на кнопку
  _clearErrorMessages() {
    const errorMessages = this._formSelector.querySelectorAll(
      this._errorMessageSelector
    );
    errorMessages.forEach((node) =>
      node.classList.remove(this._inputErrorClass)
    );
  }
  //Установка слушателей кликов
  _setEventListeners(inputList) {
    this._cardEditButton.addEventListener("click", () => {
      this._clearErrorMessages();
      this._toggleButtonState(inputList);
    });
    this._userEditButton.addEventListener("click", () => {
      this._clearErrorMessages();
      this._toggleButtonState(inputList);
    });
    this._avatarEditButton.addEventListener("click", () => {
      this._clearErrorMessages();
      this._toggleButtonState(inputList);
    });
  }
  //Публичный метод включения валидации форм
  enableValidation() {
    console.log("178 - enableValidation запущена");
    const inputList = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
    this._setEventListeners(inputList);
  }
}
