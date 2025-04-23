// @todo: Темплейт карточки
import '../pages/index.css';

const templatePush = document.querySelector('.places__list');


function createCard(card, removeCard) {
  const template = document.querySelector('#card-template').content;
  const templateContent = template.querySelector('.places__item').cloneNode(true); // Дублируем темплейт

  templateContent.querySelector('.card__image').src = card.link;
  templateContent.querySelector('.card__image').alt = card.name;
  templateContent.querySelector('.card__title').textContent = card.name;

  const remButton = templateContent.querySelector('.card__delete-button'); // Записываем кнопку в переменную
  removeCard(remButton); // Кол бек функции 

  return templateContent; // Возвращаем один готовый элемент
}

function removeCard(button) {
  button.addEventListener('click', function () {
    const listItem = button.closest('.places__item'); // Ищем родителя кнопки
    console.log(listItem)
    if (listItem) {  // Если элемент есть то он будет удален
      listItem.remove();
    }
  });
}

function addCards(cardItem) {
    templatePush.append(cardItem);// Добавляем жлемент в разметку 
}

initialCards.forEach((card) => {
  addCards(createCard(card, removeCard)) // Ревьювер годно сделал нравиться)
})











// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
