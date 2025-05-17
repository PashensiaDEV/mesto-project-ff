
import '../pages/index.css';


import { removeCard } from './card.js';
import { createCard } from './card.js';
import { openPopUp, closePopup } from './modal.js';
import { LikeCard } from './card.js';

import {getCustomerInfo} from './api.js';
import {upLoadProfileInfo} from './api.js';
import {upLoadNewCard} from './api.js';
import {cardsLoad} from './api.js';
import {cardsDelete} from './api.js';

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

export const API = 'https://nomoreparties.co/v1/'
export const authorizationKey = '4601d008-a405-4f80-81df-1bf2249ca44f';


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

const deleteButtonCard = template.querySelectorAll('.card__delete-button');
const popupDeleteCard = document.querySelector('.popup_type_delete');

const buttonOpenFormProfile = document.querySelector('.profile__edit-button');
const buttonOpenFormNewCard = document.querySelector('.profile__add-button');

export const titleProfile = document.querySelector('.profile__title');
export const descriptionProfile = document.querySelector('.profile__description');

export const imageProfile = document.querySelector('.profile__image');


const inputNameFormNewCard = popupAddNewCard.querySelector('.popup__input_type_card-name');
const inputLinkFormNewCard = popupAddNewCard.querySelector('.popup__input_type_url');


export function addCards(cardItem) {
  templatePush.append(cardItem);// Добавляем элемент в разметку 
}
// const newCard = {
//   name: inputNameFormNewCard.value,
//   link: inputLinkFormNewCard.value
// };

function handleAddNewImage(evt) { //Функция ручного добавления новой карточки
  evt.preventDefault();

  upLoadNewCard(inputNameFormNewCard.value, inputLinkFormNewCard.value)
  .then((result) => {
    const newCard = {
      name: result.name,
      link: result.link,
      likes: result.likes,
      _id: result._id,
      owner: {
        _id: result.owner._id
      }
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

function openDelteCardPopUp() {
  openPopUp(popupDeleteCard);
}


deleteButtonCard.forEach((button)=> {
  button.addEventListener('click',openDelteCardPopUp)
})


formAddNewCard.addEventListener('submit', handleAddNewImage); // Слушатель сабмита у формы добавления новой карточки 
formEditProfile.addEventListener('submit', handleSubmitProfileForm); //СЛушатель сабмита у формы изменения профиля

//Спасибо большое за все советы я правда начал понимать почему лучше передавать функцию коллбэк)) Очень полезные советы 


//_______________________________________________________________________________
//Валидация


enableValidation(validationConfig);


//_______________________________________________________________________________
// API

getCustomerInfo();

cardsLoad()
.then ((result) => {
    result.forEach((card) => {
  addCards(createCard(card, removeCard , LikeCard, openPopupImage)) // Добавляем все карточки из исходной колекции в разметку
});
  });
