import {template} from './index.js';

export function createCard(card, removeCard, LikeCard, onopenPopupImage) {
  const templateContent = template.querySelector('.places__item').cloneNode(true); // Дублируем темплейт
  const templateData = templateContent.querySelector('.card__image');

  templateData.src = card.link;
  templateData.alt = card.name;
  templateContent.querySelector('.card__title').textContent = card.name;
  templateContent.querySelector('.like-counter').textContent = card.likes.length;

  templateData.addEventListener('click', () => {
    onopenPopupImage(card);
  });

  const remButton = templateContent.querySelector('.card__delete-button'); // Записываем кнопку в переменную
  const likeButton = templateContent.querySelector('.card__like-button');
  removeCard(remButton); // Кол бек функции 

  LikeCard(likeButton);

  return templateContent; // Возвращаем один готовый элемент
}

export function removeCard(button) {
  button.addEventListener('click', function () {
    const listItem = button.closest('.places__item'); // Ищем родителя кнопки
    if (listItem) {  // Если элемент есть то он будет удален
      listItem.remove();
    }
  });
}

export function LikeCard(element) {
  element.addEventListener('click', () => {
    element.classList.toggle('card__like-button_is-active');
  })
}