//Функция демонстрации ошибки в инпуте
export const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//Функция сокрытия ошибки
export const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};
//Функция проверки инпута на валидность
export const isValid = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};
//Функция проверки инпута на  НЕвалидность
export const hasInvalidInput = (inputList) => {
  // Шаримся по массиву методом some в поисках валидности
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    return !inputElement.validity.valid;
  });
};
//Функция состояния кнопки сабмит
export const toggleButtonState = (
  inputList,
  buttonElement,
  inactiveButtonClass
) => {
  // Если есть хотя бы один невалидный инпут
  const isInputValid = hasInvalidInput(inputList);
  if (isInputValid) {
    buttonElement.classList.add(inactiveButtonClass); //Покрасить в другой цвет
    buttonElement.disabled = true; //Деактиватор кнопки
    // console.log("Кнопка submit НЕ АКТИВНА", buttonElement, inputList);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
    // console.log("Кнопка submit активна", buttonElement, inputList);
  }
};

export const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
) => {
  // Находим ВСЕ поля внутри формы, делаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  // Обходм все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавляем обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызываем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, rest);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//Функция очистки спанов после клика на кнопку
export const clearErrorMessage = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.forEach((mistake) => mistake.classList.remove(errorClass));
};

export const enableValidation = ({ formSelector, ...rest }) => {
  // Находим все формы с указанным классом в DOM, делаем из них массив
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // На каждой форме сбросим дефолты
      evt.preventDefault();
    });
    // Для каждой формы вызовем setEventListeners,передав ей элементы формы.
    setEventListeners(formElement, rest);
  });
};
