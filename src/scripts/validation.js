

export const clearValidation = (profileForm, config) => {
  const massageInput = profileForm.querySelectorAll(config.errorClassDissable);
  const inputs = profileForm.querySelectorAll(config.inputSelector)
  massageInput.forEach((elm) => {
    elm.classList.remove(config.errorClass);
    elm.textContent = '';
  })
  inputs.forEach((input)=> {
    input.classList.remove(config.inputErrorClass);
  })
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const toggleButtonState = (inputList,buttonElement, config)=> {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const hasInvalidInput = (inputList)=> {
  return inputList.some((input) => {
    if (!input.validity.valid) {
      return true
    } else {
      return false
    }
  })
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement,config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList,buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
       checkInputValidity(formElement, inputElement, config);
       toggleButtonState(inputList, buttonElement, config); 
      });
  })
}


export const enableValidation = config => { 
         const formList = document.querySelectorAll(config.formSelector);
         formList.forEach((formElement) => { 
           formElement.addEventListener('submit', function(evt) { 
             evt.preventDefault() 
           }) 
           setEventListeners(formElement, config); 
        })
      }