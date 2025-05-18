import {template} from './index.js';

export function createCard(card, removeCard, LikeCard, onopenPopupImage) {
  const templateContent = template.querySelector('.places__item').cloneNode(true); // Дублируем темплейт
  const templateData = templateContent.querySelector('.card__image');
  const likeCounter = templateContent.querySelector('.like-counter');

  templateData.src = card.link;
  templateData.alt = card.name;
  likeCounter.textContent = card.likes.length;
  templateContent.querySelector('.card__title').textContent = card.name;


  templateData.addEventListener('click', () => {
    onopenPopupImage(card);
  });

  const remButton = templateContent.querySelector('.card__delete-button'); // Записываем кнопку в переменную
  const likeButton = templateContent.querySelector('.card__like-button');

  if ((card.owner._id) === '119a34ebdcc16fb8071c44da') {
    
      removeCard(remButton,card);
  } else {
      remButton.classList.add('card__delete-button-innactive');
  }
 // Кол бек функции 
  if (card.likes.some(user => user._id === '119a34ebdcc16fb8071c44da')) {
     likeButton.classList.add('card__like-button_is-active');
  }


  LikeCard(likeButton, card, likeCounter);

  return templateContent; // Возвращаем один готовый элемент
}

export function removeCardFromHtml(Item) {
  Item.remove();
}

export function likeCardChanger(button) {
  button.classList.toggle('card__like-button_is-active');
}