export const popupFormUser = document.querySelector(".popup-form-user");
export const popupFormAvatar = document.querySelector(".popup-form-avatar");
export const cardFormPopup = document.querySelector(".popup-form-card");
export const avatarLink = document.querySelector("#url-input-avatar");
export const formUserNameInput = popupFormUser.querySelector("#name-input");
export const formUserAboutInput = popupFormUser.querySelector("#job-input");
export const titleInputCard = document.querySelector("#text-input");
export const linkInputCard = document.querySelector("#url-input-card");
export const userName = document.querySelector(".user__name");
export const userAbout = document.querySelector(".user__about");
export const userPic = document.querySelector(".user__pic");
export const cardTemplate = document.querySelector("#card").content;
export const formElement = document.querySelector(".form");
export const cards = document.querySelector(".cards");
export const popupImage = document.querySelector(".popup-image");
export const imageOpen = document.querySelector(".popup__image");
export const signImage = document.querySelector(".popup__image-alt");
export const popupCardDelete = document.querySelector(".popup-card-delete");
export const myId = "01124a9d-ad91-4991-aee6-270006a314f8";

export const cardInputs = Array.from(cardFormPopup.querySelectorAll("input"));
//Для автара
export const avatarEditButton = document.querySelector(".user__overlay");
export const avatarSubmitButton =
  popupFormAvatar.querySelector(".button-avatar");
//Для юзера
export const userEditButton = document.querySelector(".user__info-edit-button");
export const userSubmitButton = popupFormUser.querySelector(
  ".user__info-submit-button"
);
//Для карточек
export const cardEditButton = document.querySelector(".card__add-button");
export const cardSubmitButton = cardFormPopup.querySelector(".form__submit");
export const cardContent = ".cards";

export const enableValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button",
  errorMessageSelector: ".form__field",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_active",
  // avatarSubmitButton: avatarSubmitButton,
  // userSubmitButton: userSubmitButton,
  // cardSubmitButton: cardSubmitButton,
};
