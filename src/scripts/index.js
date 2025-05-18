import "../pages/index.css";

import { openPopUp, closePopup } from "./modal.js";

import { createCard } from "./card.js";
import { removeCardFromHtml } from "./card.js";

import { getCustomerInfo } from "./api.js";
import { upLoadProfileInfo } from "./api.js";
import { upLoadNewCard } from "./api.js";
import { cardsLoad } from "./api.js";
import { cardDelete } from "./api.js";
import { likeCard, unLikeCard } from "./api.js";
import { upLoadNewAvatar } from "./api.js";

import { clearValidation } from "./validation.js";
import { enableValidation } from "./validation.js";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  errorClassDissable: ".form__input-error",
};

const popupDelete = document.querySelector(".popup_type_delete");
const popupDeleteButton = popupDelete.querySelector(".popup_button-delete");

let currentCardId = null;
let currentCardElement = null;
let userId;


export const template = document.querySelector("#card-template").content;

const templatePush = document.querySelector(".places__list");

const popupFullImage = document.querySelector(".popup_type_image");
const popupImage = popupFullImage.querySelector(".popup__image");
const popupImageCaption = popupFullImage.querySelector(".popup__caption");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const formAddNewCard = popupAddNewCard.querySelector('form[name="new-place"]');
const formEditProfile = popupEditProfile.querySelector('form[name="edit-profile"]');
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const descriptionInput = popupEditProfile.querySelector(".popup__input_type_description");

const buttonOpenFormProfile = document.querySelector(".profile__edit-button");
const buttonOpenFormNewCard = document.querySelector(".profile__add-button");

export const titleProfile = document.querySelector(".profile__title");
export const descriptionProfile = document.querySelector(".profile__description");

export const imageProfile = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");

const inputNameFormNewCard = popupAddNewCard.querySelector(".popup__input_type_card-name");
const inputLinkFormNewCard = popupAddNewCard.querySelector(".popup__input_type_url");

const tempTextCont = "Сохранение...";
const originalTextCont = "Сохранить";

export function addCards(cardItem) {
  templatePush.append(cardItem); // Добавляем элемент в разметку
}
// const newCard = {
//   name: inputNameFormNewCard.value,
//   link: inputLinkFormNewCard.value
// };

function handleAddNewImage(evt) {
  //Функция ручного добавления новой карточки
  evt.preventDefault();
  const buttonLoad = popupAddNewCard.querySelector(".button");
  buttonLoad.textContent = tempTextCont;
  upLoadNewCard(inputNameFormNewCard.value, inputLinkFormNewCard.value)
    .then((result) => {
      const cardElement = createCard(
        result,
        handleDeleteCard,
        likeOnCard,
        openPopupImage,
        userId
      );
      templatePush.prepend(cardElement);
      closePopup(popupAddNewCard);
      formAddNewCard.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonLoad.textContent = originalTextCont;
    });
}

function handleSubmitProfileForm(evt) {
  //Функция изменения данных профиля
  evt.preventDefault();
  const buttonLoad = popupEditProfile.querySelector(".button");
  buttonLoad.textContent = tempTextCont;
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(popupEditProfile);

  upLoadProfileInfo(nameInput.value, descriptionInput.value)
    .then((object) => {
      titleProfile.textContent = object.name;
      descriptionProfile.textContent = object.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonLoad.textContent = originalTextCont;
    });
  closePopup(popupEditProfile);
}

function openPopupProfile() {
  //Функция открытия попапа редактирования профиля
  descriptionInput.value = descriptionProfile.textContent;
  nameInput.value = titleProfile.textContent;
  openPopUp(popupEditProfile);
  clearValidation(formEditProfile, validationConfig);
}

function openPopupAddImage() {
  // Функция открытия попапа добьавления новой фотографии
  openPopUp(popupAddNewCard);
}

function openPopupImage(card) {
  //Функция открытия попапа карточек
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageCaption.textContent = card.name;
  openPopUp(popupFullImage);
}

function openPopupAvatarEdit() {
  //функция открытия попапа изменения аватара
  const formAvatarPopup = popupEditAvatar.querySelector(".popup__form");
  const inputAvatarPopup = popupEditAvatar.querySelector(".popup__input");
  openPopUp(popupEditAvatar);
  formAvatarPopup.addEventListener("submit", () => {
    uploadAvatar(inputAvatarPopup.value);
  });
}

function handleDeleteCard(cardId, listItem) {
  currentCardId = cardId;
  currentCardElement = listItem;
  openPopUp(popupDelete);
}



function likeOnCard(card, isLiked, onSuccess, onError) {
  const action = isLiked ? unLikeCard : likeCard;

  action(card._id)
    .then((updatedCard) => {
      onSuccess(updatedCard);
    })
    .catch((err) => {
      console.error(`Ошибка при ${isLiked ? "удалении" : "добавлении"} лайка:`, err);
      if (onError) onError(err);
    });
}



function uploadAvatar(url) {
  const buttonLoad = popupEditAvatar.querySelector('.button');
  buttonLoad.textContent = tempTextCont;
  upLoadNewAvatar(url)
  .then((res) => {
    imageProfile.style.backgroundImage = `url(${res.avatar})`;
    closePopup(popupEditAvatar);
  })
  .catch((err) => {
    console.error(err)
  })
  .finally(()=> {
    buttonLoad.textContent = originalTextCont;
  })
}

buttonOpenFormProfile.addEventListener("click", openPopupProfile); //Слушатель на открытие формы редактирования профиля
buttonOpenFormNewCard.addEventListener("click", openPopupAddImage); //Слушатель на открытие формы добавления карточки
imageProfile.addEventListener("click", openPopupAvatarEdit);

popupDeleteButton.addEventListener("click", () => {
  if (currentCardId && currentCardElement) {
    cardDelete(currentCardId)
      .then(() => {
        removeCardFromHtml(currentCardElement);
        closePopup(popupDelete);
        currentCardId = null;
        currentCardElement = null;
      })
      .catch((err) => {
        console.error("Ошибка при удалении карточки:", err);
      });
  }
});


document.querySelectorAll(".popup").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup__close") ||
      event.target.classList.contains("popup")
    ) {
      closePopup(modal);
    }
  });
});

formAddNewCard.addEventListener("submit", handleAddNewImage); // Слушатель сабмита у формы добавления новой карточки
formEditProfile.addEventListener("submit", handleSubmitProfileForm); //СЛушатель сабмита у формы изменения профиля

//Спасибо большое за все советы я правда начал понимать почему лучше передавать функцию коллбэк)) Очень полезные советы

//_______________________________________________________________________________
//Валидация

enableValidation(validationConfig);

//_______________________________________________________________________________
// API



Promise.all([getCustomerInfo(), cardsLoad()])
.then(([userInfo, cards]) => {
  console.log(userInfo,cards)
   userId = userInfo._id;
    titleProfile.textContent = userInfo.name;
    descriptionProfile.textContent = userInfo.about;
    imageProfile.style.backgroundImage = `url(${userInfo.avatar})`
   cards.forEach((card) => {
    addCards(createCard(card, handleDeleteCard, likeOnCard, openPopupImage, userId)); // Добавляем все карточки из исходной колекции в разметку
  });
})
