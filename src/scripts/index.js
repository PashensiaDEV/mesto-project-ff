// @todo: Темплейт карточки
import '../pages/index.css';

import { initialCards } from './cards.js';
import { removeCard } from './card.js';
import { createCard } from './card.js';
import { openPopUp, closePopup } from './modal.js';
import { onLikeCard } from './card.js';

const templatePush = document.querySelector('.places__list');

const imgPopUpBlock = document.querySelector('.popup_type_image');
const popUpImage =  imgPopUpBlock.querySelector('.popup__image');
const imageCaption = imgPopUpBlock.querySelector('.popup__caption');
const formElement = document.querySelector('.popup_type_edit') ;
const imageModule =document.querySelector('.popup_type_new-card');
const imagePopUpWin = document.querySelector('.popup_type_image');
const buttonOpenFormNewCard = document.querySelector('.profile__add-button');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const buttonOpenFormProfile = document.querySelector('.profile__edit-button');

const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

const titleNewCard= imageModule.querySelector('.popup__input_type_card-name');
const urlNewCard = imageModule.querySelector('.popup__input_type_url');

const newCard = {
  name: titleNewCard.value,
  link: urlNewCard.value
};


function addCards(cardItem) {
  templatePush.prepend(cardItem);// Добавляем элемент в разметку 
}

function handleAddNewImage(evt) { //Функция ручного добавления новой карточки
  evt.preventDefault();
  
  newCard.name = titleNewCard.value,
  newCard.link = urlNewCard.value

  const cardElement = createCard(newCard, removeCard , onLikeCard);

  addCards(cardElement);

  imageModule.classList.remove('popup_is-opened');
  imageModule.reset();
  
}

function handleSubmitProfileForm (evt) {   //Функция изменения данных профиля 
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  closePopup(formElement);
}

function openPopupProfile () {  //Функция открытия попапа редактирования профиля
  jobInput.value = descriptionProfile.textContent;
  nameInput.value = titleProfile.textContent;
  openPopUp(formElement);
}

function openPopupAddImage() { // Функция открытия попапа добьавления новой фотографии
  openPopUp(imageModule);
}

function openPopupImage(card) {  //Функция открытия попапа карточек
  popUpImage.src = card.link;
  imageCaption.textContent = card.name;
  openPopUp(imagePopUpWin);
}

initialCards.forEach((card) => {
  addCards(createCard(card, removeCard , onLikeCard)) // Добавляем все карточки из исходной колекции в разметку
});

buttonOpenFormProfile.addEventListener('click', openPopupProfile); //Слушатель на открытие формы редактирования профиля
buttonOpenFormNewCard.addEventListener('click', openPopupAddImage); //Слушатель на открытие формы добавления карточки
templatePush.addEventListener('click',(event) => { //Здесь мы по делегированию события понимаем куда кликает пользователь
  const target = event.target;                  //И перезаписмуем данные изображения в константы и передаем в функцию
  if (target.classList.contains('card__image')) {
    newCard.link = target.src;
    newCard.name = target.alt;
    openPopupImage(newCard);  
}});



imageModule.addEventListener('submit', handleAddNewImage);
formElement.addEventListener('submit', handleSubmitProfileForm);




// document.querySelectorAll('.card__like-button').forEach(button => {button.addEventListener('click', onLikeCard)})




// popupImgButtons.forEach(img => {
//   img.addEventListener('click', () => {
//     const fullSrc = img.src;
//     const caption = img.alt;
//     OpenImgPopUp(fullSrc, caption);
//   });
// })











// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страниц
