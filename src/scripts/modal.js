const ImgPopUpBlock = document.querySelector('.popup_type_image');
const PopUpImage =  ImgPopUpBlock.querySelector('.popup__image');
const ImageCaption = ImgPopUpBlock.querySelector('.popup__caption');
export const formElement = document.querySelector('.popup_type_edit') 
export const ImageModule =document.querySelector('.popup_type_new-card');
const nameInput = formElement.querySelector('.popup__input_type_name') 
const jobInput = formElement.querySelector('.popup__input_type_description') 

export function openPopup(popupSelector) {  //функция открытия попапа редактирования и добавление новой карточки
  const popup = document.querySelector(popupSelector);
  if (popup) {
    popup.classList.add('popup_is-opened');
  }



  const CloseEsc = (e) => {
    if (e.key === 'Escape') {
      closePopup(popup);
    }
  }
  document.addEventListener('keydown', CloseEsc); // Создали обработчик на ескейп

  const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', CloseEsc); // Убираем обработчик
  };

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('popup_is-opened');
    }
  });

  document.querySelectorAll('.popup').forEach(popup => {// закрытие попапа только если клик по фону, а не по контенту
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('popup_is-opened');
      }
    });
  });
}

document.querySelectorAll('.popup__close').forEach(btn => {//метод для закрытия через слушателя
  btn.addEventListener('click', () => {
    btn.closest('.popup').classList.remove('popup_is-opened');
  });
});

export function OpenImgPopUp (src,alt) { //функция для открытия попапа изображения 
  PopUpImage.src = src;
  PopUpImage.alt = alt;
  ImageCaption.textContent = alt;
  ImgPopUpBlock.classList.add('popup_is-opened');
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ImgPopUpBlock.classList.remove('popup_is-opened');
    }
  })
}


nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

export function handleFormSubmit(evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    formElement.classList.remove('popup_is-opened');
}
