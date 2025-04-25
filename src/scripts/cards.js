import Naruto from '../images/naruto-character.jpg'
import Itachi from '../images/itachi_character.jpg'
import Kakashi from '../images/kakashi-character.jpg'
import Obito from '../images/obito-character.jpg'
import Orochimaru from '../images/orochimaru-character.jpg'
import NarutoLong from '../images/naruto-character-long.jpg'

const templatePush = document.querySelector('.places__list');



export const initialCards = [
    {
      name: "Naruto",
      link: Naruto,
    },
    {
      name: "Itachi",
      link: Itachi,
    },
    {
      name: "Kakashi",
      link: Kakashi,
    },
    {
      name: "Obito",
      link: Obito,
    },
    {
      name: "Orochimaru",
      link: Orochimaru,
    },
    {
      name: "Naruto Long",
      link: NarutoLong,
    }
];

export function createCard(card, removeCard) {
  const template = document.querySelector('#card-template').content;
  const templateContent = template.querySelector('.places__item').cloneNode(true); // Дублируем темплейт

  templateContent.querySelector('.card__image').src = card.link;
  templateContent.querySelector('.card__image').alt = card.name;
  templateContent.querySelector('.card__title').textContent = card.name;

  const remButton = templateContent.querySelector('.card__delete-button'); // Записываем кнопку в переменную
  removeCard(remButton); // Кол бек функции 

  return templateContent; // Возвращаем один готовый элемент
}

export function removeCard(button) {
  button.addEventListener('click', function () {
    const listItem = button.closest('.places__item'); // Ищем родителя кнопки
    console.log(listItem)
    if (listItem) {  // Если элемент есть то он будет удален
      listItem.remove();
    }
  });
}

export function addCards(cardItem) {
  templatePush.prepend(cardItem);// Добавляем жлемент в разметку 
}



export function likeCard(element) {
  element.target.classList.toggle('card__like-button_is-active');
}