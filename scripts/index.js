// @todo: Темплейт карточки
let cardsList = addCard(initialCards, removeCard);


function addCard(cards, removeCard) {
  const template = document.querySelector('#card-template').content;
  const templatePush = document.querySelector('.places__list');
  const memoryTemplate = [];
  for (let i = 0; i < cards.length; i++ ) {
    const templateContent = template.querySelector('.places__item').cloneNode(true);

    templateContent.querySelector('.card__image').src = cards[i].link;
    templateContent.querySelector('.card__image').alt = cards[i].name;
    templateContent.querySelector('.card__title').textContent = cards[i].name;

    const remButton = templateContent.querySelector('.card__delete-button');
    removeCard(remButton);

    memoryTemplate.push(templateContent)
    templatePush.append(memoryTemplate[i]);
  }
  return memoryTemplate;
}

function removeCard(button) {
  button.addEventListener('click', function () {
    const listItem = button.closest('.places__item'); // Ищем родителя кнопки
    if (listItem) {
      listItem.remove();
    }
  });
}









// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
