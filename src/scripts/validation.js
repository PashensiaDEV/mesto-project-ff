import { validationConfig } from ".";

export const clearValidation = (profileForm, validationConfig) => {
  const massageInput = profileForm.querySelectorAll(validationConfig.errorClassDissable);
  const inputs = profileForm.querySelectorAll(validationConfig.inputSelector)
  massageInput.forEach((elm) => {
    elm.classList.remove(validationConfig.errorClass);
    elm.textContent = '';
  })
  inputs.forEach((input)=> {
    input.classList.remove(validationConfig.inputErrorClass);
  })
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const toggleButtonState = (inputList,buttonElement)=> {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
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

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList,buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
       checkInputValidity(formElement, inputElement);
       toggleButtonState(inputList, buttonElement); 
      });
  })
}

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      
    });
    setEventListeners(formElement);
  })
}