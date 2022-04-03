//Настройка валидации полей формы
import { enableValidationForm } from "../utils/constants";

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
  // //Функция проверки инпута на валидность
  // export const isValid = (formElement, inputElement, rest) => {
  //   if (!inputElement.validity.valid) {
  //     showInputError(
  //       formElement,
  //       inputElement,
  //       inputElement.validationMessage,
  //       rest
  //     );
  //   } else {
  //     hideInputError(formElement, inputElement, rest);
  //   }
  // };
  //Проверка валидности поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  //   //Функция демонстрации ошибки в инпуте
  // _showInputError = (
  //   formElement,
  //   inputElement,
  //   errorMessage,
  //   { inputErrorClass, errorClass }
  // ) => {
  //   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //   // inputElement.classList.add(inputErrorClass);
  //   errorElement.textContent = errorMessage;
  //   errorElement.classList.add(errorClass);
  // };
  //Показать ошибку ввода
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.nextElementSibling;
    // const errorElement = formElement.querySelector(
    //   `.${inputElement._id}-error`
    // );
    console.log(
      "str 57",
      "инпут -",
      formElement,
      "span - ",
      errorElement,
      "сообщение - ",
      errorMessage
    );
    // errorElement.textContent = errorMessage;
    // errorElement.classList.add(this._inputErrorClass);
  }
  //Функция сокрытия ошибки
  // export const hideInputError = (
  //   formElement,
  //   inputElement,
  //   { inputErrorClass, errorClass }
  // ) => {
  //   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //   // inputElement.classList.remove(inputErrorClass);
  //   errorElement.textContent = "";
  //   errorElement.classList.remove(errorClass);
  // };
  //Скрыть ошибку ввода
  _hideInputError(formElement, inputElement) {
    // const errorElement = inputElement.nextElementSibling;
    const errorElement = formElement.querySelector(`.${inputElement}-error`);
    // errorElement.textContent = "";
    // errorElement.classList.remove(this._inputErrorClass);
  }
  //   //Функция проверки инпута на  НЕвалидность
  // export const hasInvalidInput = (inputList) => {
  //   // Шаримся по массиву методом some в поисках валидности
  //   return inputList.some((inputElement) => {
  //     // Если поле не валидно, колбэк вернёт true
  //     return !inputElement.validity.valid;
  //   });
  // };
  //Проверить инпут на НЕвалидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //Функция состояния кнопки сабмит
  // export const toggleButtonState = (
  //   inputList,
  //   buttonElement,
  //   inactiveButtonClass
  // ) => {
  //   // Если есть хотя бы один невалидный инпут
  //   const isInputValid = hasInvalidInput(inputList);
  //   if (isInputValid) {
  //     buttonElement.classList.add(inactiveButtonClass); //Покрасить в другой цвет
  //     buttonElement.disabled = true; //Деактиватор кнопки
  //     // console.log("Кнопка submit НЕ АКТИВНА", buttonElement, inputList);
  //   } else {
  //     buttonElement.classList.remove(inactiveButtonClass);
  //     buttonElement.disabled = false;
  //     // console.log("Кнопка submit активна", buttonElement, inputList);
  //   }
  // };
  //Изменить состояние кнопки сабмита
  _toggleButtonState(inputList) {
    console.log("114 - toggleButtonState запущена");
    const buttonElement = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true; //Деактиватор кнопки
      console.log("121 Кнопка submit НЕ АКТИВНА", buttonElement, inputList);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
      console.log("Кнопка submit активна", buttonElement, inputList);
    }
  }
  //Функция очистки спанов после клика на кнопку
  // export const clearErrorMessage = (formElement, inputElement, errorClass) => {
  //   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //   errorElement.forEach((mistake) => mistake.classList.remove(errorClass));
  // };
  _clearErrorMessages() {
    const errorMessages = this._formSelector.querySelectorAll(
      this._errorMessageSelector
    );
    errorMessages.forEach((node) =>
      node.classList.remove(this._inputErrorClass)
    );
  }
  //   export const setEventListeners = (
  //   formElement,
  //   { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
  // ) => {
  //   // Находим ВСЕ поля внутри формы, делаем из них массив методом Array.from
  //   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  //   const buttonElement = formElement.querySelector(submitButtonSelector);
  //   // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  //   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  //   // Обходм все элементы полученной коллекции
  //   inputList.forEach((inputElement) => {
  //     // каждому полю добавляем обработчик события input
  //     inputElement.addEventListener("input", () => {
  //       // Внутри колбэка вызываем isValid, передав ей форму и проверяемый элемент
  //       isValid(formElement, inputElement, rest);
  //       // Вызовем toggleButtonState и передадим ей массив полей и кнопку
  //       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  //     });
  //   });
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
// enableValidation = ({ formSelector, ...rest }) => {
//   // Находим все формы с указанным классом в DOM, делаем из них массив
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   // Переберём полученную коллекцию
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => {
//       // На каждой форме сбросим дефолты
//       evt.preventDefault();
//     });
//     // Для каждой формы вызовем setEventListeners,передав ей элементы формы.
//     setEventListeners(formElement, rest);
//   });
// }
