export class FormValidator {
  //Принимаем в конструктор объект настроек с селекторами и классами формы,
  //а вторым параметром попап
  constructor(enableValidationForm, form) {
    this._form = form;
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
    errorElement.classList.add(this._inputErrorClass);
  }
  //Функция сокрытия ошибки ввода
  _hideInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.nextElementSibling;
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
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    //Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass); //Покрасить в другой цвет
      buttonElement.disabled = true; //Деактиватор кнопки
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
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
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
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
