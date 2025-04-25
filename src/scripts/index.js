// @todo: Темплейт карточки
import { initialCards } from './cards.js';
import { removeCard } from './cards.js';
import { createCard } from './cards.js';
import { addCards } from './cards.js';
import { openPopup } from './modal.js';
import { OpenImgPopUp } from './modal.js'
import { formElement } from './modal.js';
import { handleFormSubmit } from './modal.js';
import { handleAddImage } from './modal.js';
import { ImageModule } from './modal.js';
import { likeCard } from './cards.js';

import '../pages/index.css';

const popupButtons = document.querySelectorAll('[data-popup]');
const listCards = document.querySelector('.places__list');


initialCards.forEach((card) => {
  addCards(createCard(card, removeCard)) // Ревьювер годно сделал нравиться
});

popupButtons.forEach(button => {  //Открытие попапа редактирования и добавление новой фото по слушателю
  button.addEventListener('click', () => {
    const popupSelector = button.getAttribute('data-popup');
    openPopup(popupSelector);
  });
});

listCards.addEventListener('click',(event) => { //Здесь мы по делегированию события понимаем куда кликает пользователь
  const target = event.target;                  //И перезаписмуем данные изображения в константы и передаем в функцию
  if (target.classList.contains('card__image')) {
    const fullSrc = target.src;
    const caption = target.alt;
    OpenImgPopUp(fullSrc, caption);
}});

formElement.addEventListener('submit', handleFormSubmit); 

ImageModule.addEventListener('submit', handleAddImage);

document.querySelectorAll('.card__like-button').forEach(button => {button.addEventListener('click', likeCard)})




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
