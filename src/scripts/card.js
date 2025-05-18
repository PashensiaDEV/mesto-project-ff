import {template} from './index.js';

export function createCard(card, handleDeleteCard, likeOnCard, onopenPopupImage, userId) {
  const templateContent = template.querySelector('.places__item').cloneNode(true); // Дублируем темплейт
  const templateData = templateContent.querySelector('.card__image');
  const likeCounter = templateContent.querySelector('.like-counter');
  const popupDelete = document.querySelector(".popup_type_delete");
  const remButton = templateContent.querySelector('.card__delete-button'); // Записываем кнопку в переменную
  const likeButton = templateContent.querySelector('.card__like-button');

  templateData.src = card.link;
  templateData.alt = card.name;
  likeCounter.textContent = card.likes.length;
  templateContent.querySelector('.card__title').textContent = card.name;


  templateData.addEventListener('click', () => {
    onopenPopupImage(card);
  });


  if ((card.owner._id) === userId) {
    
      remButton.addEventListener('click', () => {
        handleDeleteCard(card._id, templateContent, popupDelete)
      })
  } else {
      remButton.classList.add('card__delete-button-innactive');
  }



 // Кол бек функции 
  if (card.likes.some(user => user._id === userId)) {
     likeButton.classList.add('card__like-button_is-active');
  }


  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    likeOnCard(card, isLiked, (updatedCard) => {
      likeCardChanger(likeButton);
      likeCounter.textContent = updatedCard.likes.length;
      card.likes = updatedCard.likes;
    });
  });

  return templateContent; // Возвращаем один готовый элемент
}

export function removeCardFromHtml(item) {
  item.remove();
}

export function likeCardChanger(button) {
  button.classList.toggle('card__like-button_is-active');
}