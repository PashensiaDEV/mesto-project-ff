export function createCard(card, removeCard, onLikeCard) {
  const template = document.querySelector('#card-template').content;
  const templateContent = template.querySelector('.places__item').cloneNode(true); // Дублируем темплейт
  const TemplateData = templateContent.querySelector('.card__image');

  TemplateData.src = card.link;
  TemplateData.alt = card.name;
  templateContent.querySelector('.card__title').textContent = card.name;

  const remButton = templateContent.querySelector('.card__delete-button'); // Записываем кнопку в переменную
  const likeButton = templateContent.querySelector('.card__like-button');
  removeCard(remButton); // Кол бек функции 

  onLikeCard(likeButton);

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

export function onLikeCard(element) {
  element.addEventListener('click', () => {
    element.classList.toggle('card__like-button_is-active');
  })
}