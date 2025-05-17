
import '../pages/index.css';


import { initialCards } from './cards.js';


import { removeCard } from './card.js';
import { createCard } from './card.js';
import { openPopUp, closePopup } from './modal.js';
import { LikeCard } from './card.js';

import { clearValidation } from './validation.js';
import { enableValidation } from './validation.js';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  errorClassDissable: '.form__input-error'
};

const API = 'https://nomoreparties.co/v1/'
const authorizationKey = '4601d008-a405-4f80-81df-1bf2249ca44f';


export const template = document.querySelector('#card-template').content;

const templatePush = document.querySelector('.places__list');

const popupFullImage = document.querySelector('.popup_type_image');
const popupImage =  popupFullImage.querySelector('.popup__image');
const popupImageCaption = popupFullImage.querySelector('.popup__caption');
const popupEditProfile = document.querySelector('.popup_type_edit') ;
const popupAddNewCard =document.querySelector('.popup_type_new-card');
const formAddNewCard = popupAddNewCard.querySelector('form[name="new-place"]')
const formEditProfile =  popupEditProfile.querySelector('form[name="edit-profile"]')
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const descriptionInput = popupEditProfile.querySelector('.popup__input_type_description');


const buttonOpenFormProfile = document.querySelector('.profile__edit-button');
const buttonOpenFormNewCard = document.querySelector('.profile__add-button');

const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

const imageProfile = document.querySelector('.profile__image');


const inputNameFormNewCard = popupAddNewCard.querySelector('.popup__input_type_card-name');
const inputLinkFormNewCard = popupAddNewCard.querySelector('.popup__input_type_url');


const newCard = {
  name: inputNameFormNewCard.value,
  link: inputLinkFormNewCard.value
};


function addCards(cardItem) {
  templatePush.prepend(cardItem);// Добавляем элемент в разметку 
}
// const newCard = {
//   name: inputNameFormNewCard.value,
//   link: inputLinkFormNewCard.value
// };


function addCards(cardItem) {
  templatePush.append(cardItem);// Добавляем элемент в разметку 

}

function handleAddNewImage(evt) { //Функция ручного добавления новой карточки
  evt.preventDefault();

  
  newCard.name = inputNameFormNewCard.value,
  newCard.link = inputLinkFormNewCard.value

  const cardElement = createCard(newCard, removeCard , LikeCard, openPopupImage);

  addCards(cardElement);

  closePopup(popupAddNewCard);
  formAddNewCard.reset();

  upLoadNewCard(inputNameFormNewCard.value, inputLinkFormNewCard.value)
  .then((result) => {
    const newCard = {
      name: result.name,
      link: result.link,
      likes: result.likes
    }
    console.log(result)
    const cardElement = createCard(newCard, removeCard , LikeCard, openPopupImage);
    templatePush.prepend(cardElement);
    closePopup(popupAddNewCard);
    formAddNewCard.reset();
  })
}

function handleSubmitProfileForm (evt) {   //Функция изменения данных профиля 
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(popupEditProfile);

  upLoadProfileInfo(nameInput.value, descriptionInput.value)
  .then((object) => {
    titleProfile.textContent = object.name;
    descriptionProfile.textContent = object.about;
  })
  .catch ((error) => {
    console.log(error)
  })
  closePopup(popupEditProfile);
  
}

function openPopupProfile () {  //Функция открытия попапа редактирования профиля
  descriptionInput.value = descriptionProfile.textContent;
  nameInput.value = titleProfile.textContent;
  openPopUp(popupEditProfile);
  clearValidation(formEditProfile, validationConfig);
}

function openPopupAddImage() { // Функция открытия попапа добьавления новой фотографии
  openPopUp(popupAddNewCard);
}

function openPopupImage(card) {  //Функция открытия попапа карточек
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageCaption.textContent = card.name;
  openPopUp(popupFullImage);
}

initialCards.forEach((card) => {
  addCards(createCard(card, removeCard , LikeCard, openPopupImage)) // Добавляем все карточки из исходной колекции в разметку
});



buttonOpenFormProfile.addEventListener('click', openPopupProfile); //Слушатель на открытие формы редактирования профиля
buttonOpenFormNewCard.addEventListener('click', openPopupAddImage); //Слушатель на открытие формы добавления карточки



// templatePush.addEventListener('click',(event) => { //Здесь мы по делегированию события понимаем куда кликает пользователь
//   const target = event.target;                  //И перезаписмуем данные изображения в константы и передаем в функцию
//   if (target.classList.contains('card__image')) {
//     newCard.link = target.src;
//     newCard.name = target.alt;
//     openPopupImage(newCard);  
// }});

document.querySelectorAll('.popup').forEach((modal) => {  //
  modal.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup__close')|| event.target.classList.contains('popup')) { 
      closePopup(modal);
    }
  })
})



formAddNewCard.addEventListener('submit', handleAddNewImage); // Слушатель сабмита у формы добавления новой карточки 
formEditProfile.addEventListener('submit', handleSubmitProfileForm); //СЛушатель сабмита у формы изменения профиля

//Спасибо большое за все советы я правда начал понимать почему лучше передавать функцию коллбэк)) Очень полезные советы 


//_______________________________________________________________________________
//Валидация


enableValidation(validationConfig);


//_______________________________________________________________________________
// API

function getCustomerInfo() {
  fetch(`${API}wff-cohort-38/users/me`, {
    method: 'GET',
    headers: {
    authorization: authorizationKey
  }
  })
  .then((res)=> {
    return res.json()
  })
  .then((result) => {
    titleProfile.textContent = result.name;
    descriptionProfile.textContent = result.about;
    imageProfile.style.backgroundImage = `url(${result.avatar})`;
  })}


getCustomerInfo();

function upLoadProfileInfo(nameValue, aboutValue) {
  return fetch(`${API}wff-cohort-38/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: authorizationKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameValue,
    about: aboutValue
  })
})
.then((res)=> {
    return res.json();
  })
}

function upLoadNewCard(nameValue, urlValue) {
  return fetch(`${API}wff-cohort-38/cards`, {
  method: 'POST',
  headers: {
    authorization: authorizationKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameValue,
    link: urlValue
  })
})
.then((res)=> {
    return res.json();
  })
}

function cardsLoad() {
  fetch (`${API}wff-cohort-38/cards`, {
     method: 'GET',
    headers: {
    authorization: authorizationKey
    }
  })
  .then ((res) => {
   return res.json();
  })
  .then ((result) => {
    result.forEach((card) => {
  addCards(createCard(card, removeCard , LikeCard, openPopupImage)) // Добавляем все карточки из исходной колекции в разметку
});
  })
}

cardsLoad();