
export function openPopUp(popupSelector) {
  popupSelector.classList.add('popup_is-opened')
  document.addEventListener('keydown', closeEscPopup);

}

export function closePopup(popupSelector) {  
  popupSelector.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeEscPopup);
 }

function closeEscPopup(e) {
  if(e.key === 'Escape') { 
    const openedModuleWindow = document.querySelector('.popup_is-opened');
    closePopup(openedModuleWindow);
  }
}

document.querySelectorAll('.popup').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup__close')|| event.target.classList.contains('popup')) { 
      closePopup(modal);
    }
  })
})