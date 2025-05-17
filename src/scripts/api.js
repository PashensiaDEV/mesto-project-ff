import {API} from './index.js';
import {authorizationKey} from './index.js'
import {imageProfile} from './index.js'
import {descriptionProfile} from './index.js'
import {titleProfile} from './index.js'



export function getCustomerInfo() {
  fetch(`${API}wff-cohort-38/users/me`, {
    method: 'GET',
    headers: {
    authorization: authorizationKey
  }
  })
  .then((res)=> {
    return res.json()
  })
  .then((result) => {
    titleProfile.textContent = result.name;
    descriptionProfile.textContent = result.about;
    imageProfile.style.backgroundImage = `url(${result.avatar})`;
  })}

export function upLoadProfileInfo(nameValue, aboutValue) {
  return fetch(`${API}wff-cohort-38/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: authorizationKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameValue,
    about: aboutValue
  })
})
.then((res)=> {
    return res.json();
  })
}

export function upLoadNewCard(nameValue, urlValue) {
  return fetch(`${API}wff-cohort-38/cards`, {
  method: 'POST',
  headers: {
    authorization: authorizationKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameValue,
    link: urlValue
  })
})
.then((res)=> {
    return res.json();
  })
}

export function cardsLoad() {
  return fetch (`${API}wff-cohort-38/cards`, {
     method: 'GET',
    headers: {
    authorization: authorizationKey
    }
  })
  .then ((res) => {
   return res.json();
  });
}

export function cardDelete(cardId) {
  return fetch (`${API}wff-cohort-38/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
    authorization: authorizationKey
    }
  })
}