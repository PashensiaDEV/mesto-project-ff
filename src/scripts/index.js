
import '../pages/index.css';

import { openPopUp, closePopup } from './modal.js';

import { createCard } from './card.js';
import { removeCardFromHtml } from './card.js';
import { likeCardChanger } from './card.js';

import {getCustomerInfo} from './api.js';
import {upLoadProfileInfo} from './api.js';
import {upLoadNewCard} from './api.js';
import {cardsLoad} from './api.js';
import { cardDelete } from './api.js';
import { likeCard, unLikeCard } from './api.js';
import { upLoadNewAvatar } from './api.js';

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

const buttonOpenFormProfile = document.querySelector('.profile__edit-button');
const buttonOpenFormNewCard = document.querySelector('.profile__add-button');

export const titleProfile = document.querySelector('.profile__title');
export const descriptionProfile = document.querySelector('.profile__description');

export const imageProfile = document.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');


const inputNameFormNewCard = popupAddNewCard.querySelector('.popup__input_type_card-name');
const inputLinkFormNewCard = popupAddNewCard.querySelector('.popup__input_type_url');

const tempTextCont = 'Сохранение...';
const originalTextCont = 'Сохранить';


export function addCards(cardItem) {
  templatePush.append(cardItem);// Добавляем элемент в разметку 
}
// const newCard = {
//   name: inputNameFormNewCard.value,
//   link: inputLinkFormNewCard.value
// };

function handleAddNewImage(evt) { //Функция ручного добавления новой карточки
  evt.preventDefault();
  const buttonLoad = popupAddNewCard.querySelector('.button')
  buttonLoad.textContent = tempTextCont;
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
    const cardElement = createCard(newCard, removeCard , LikeCard, openPopupImage);
    templatePush.prepend(cardElement);
    closePopup(popupAddNewCard);
    formAddNewCard.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonLoad.textContent = originalTextCont;
  })
}

function handleSubmitProfileForm (evt) {   //Функция изменения данных профиля 
  evt.preventDefault();
  const buttonLoad = popupEditProfile.querySelector('.button')
  buttonLoad.textContent = tempTextCont;
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(popupEditProfile);

  upLoadProfileInfo(nameInput.value, descriptionInput.value)
  .then((object) => {
    titleProfile.textContent = object.name;
    descriptionProfile.textContent = object.about;
  })
  .catch ((err) => {
    console.log(err)
  })
  .finally(()=> {
    buttonLoad.textContent = originalTextCont;
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

function openPopupAvatarEdit() { //функция открытия попапа изменения аватара
  const formAvatarPopup = popupEditAvatar.querySelector('.popup__form');
  const inputAvatarPopup = popupEditAvatar.querySelector('.popup__input');
  openPopUp(popupEditAvatar);
  formAvatarPopup.addEventListener('submit', () => {
    uploadAvatar(inputAvatarPopup.value);
  })

}

function removeCard(button, card) {  //функция удаления карточки с сервера и с разметки 
  button.addEventListener('click', function () {
    const listItem = button.closest('.places__item');
    const popupDelete = document.querySelector('.popup_type_delete ')
    const popupDeleteButton = popupDelete.querySelector('.popup_button-delete')
    openPopUp(popupDelete);
    popupDeleteButton.addEventListener('click', () => {
 cardDelete(card._id)
    .then(() => {
      if (listItem) {  // Если элемент есть то он будет удален
        removeCardFromHtml(listItem)
        closePopup(popupDelete);
      }
    });
    })
 });
}

// function LikeCard(element) {
//   element.addEventListener('click', () => {
//     element.classList.toggle('card__like-button_is-active');
//   })
// }

function LikeCard(button, card, likeCounterElement) {
  button.addEventListener('click', () => {
    const isLiked = button.classList.contains('card__like-button_is-active');

    const action = isLiked ? unLikeCard : likeCard;

    action(card._id)
      .then(updatedCard => {
        likeCardChanger(button);
        likeCounterElement.textContent = updatedCard.likes.length;
        card.likes = updatedCard.likes;
      })
      .catch(err => {
        console.error(`Ошибка при ${isLiked ? 'удалении' : 'добавлении'} лайка:`, err);
      });
  });
}

function uploadAvatar(url) {

  upLoadNewAvatar(url)
  .then((res) => {
    imageProfile.style.backgroundImage = `url(${res.avatar})`;
    closePopup(popupEditAvatar);
  })
}

buttonOpenFormProfile.addEventListener('click', openPopupProfile); //Слушатель на открытие формы редактирования профиля
buttonOpenFormNewCard.addEventListener('click', openPopupAddImage); //Слушатель на открытие формы добавления карточки
imageProfile.addEventListener('click', openPopupAvatarEdit)

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

getCustomerInfo();

cardsLoad()
.then ((result) => {
    result.forEach((card) => {
  addCards(createCard(card, removeCard , LikeCard, openPopupImage)) // Добавляем все карточки из исходной колекции в разметку
});
  });

