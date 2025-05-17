import {template} from './index.js';

export function createCard(card, removeCard, LikeCard, onopenPopupImage) {
  const templateContent = template.querySelector('.places__item').cloneNode(true); // Дублируем темплейт
  const templateData = templateContent.querySelector('.card__image');

  templateData.src = card.link;
  templateData.alt = card.name;
  templateContent.querySelector('.card__title').textContent = card.name;
  templateContent.querySelector('.like-counter').textContent = card.likes.length;
  console.log(card)


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

  LikeCard(likeButton);

  return templateContent; // Возвращаем один готовый элемент
}

export function removeCard(button, card) {
  button.addEventListener('click', function () {
    const listItem = button.closest('.places__item');
    // cardDelete(card._id)
    // .then(() => {
      if (listItem) {  // Если элемент есть то он будет удален
      listItem.remove();
    }
  // });
 });
}

export function LikeCard(element) {
  element.addEventListener('click', () => {
    element.classList.toggle('card__like-button_is-active');
  })
}