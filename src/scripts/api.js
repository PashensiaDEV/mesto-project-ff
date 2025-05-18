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
  .then((res) => {
    if (res.ok){
    return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
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
.then((res) => {
  if (res.ok){
  return res.json();
  } return Promise.reject(`Ошибка: ${res.status}`);
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
.then((res) => {
  if (res.ok){
  return res.json();
  } return Promise.reject(`Ошибка: ${res.status}`);
})
}

export function cardsLoad() {
  return fetch (`${API}wff-cohort-38/cards`, {
     method: 'GET',
    headers: {
    authorization: authorizationKey
    }
  })
  .then((res) => {
    if (res.ok){
    return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
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

export function likeCard(cardId) {
  return fetch (`${API}wff-cohort-38/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
    authorization: authorizationKey
    }
  })
  .then((res) => {
    if (res.ok){
    return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function unLikeCard(cardId) {
  return fetch (`${API}wff-cohort-38/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
    authorization: authorizationKey
    }
  })
  .then((res) => {
    if (res.ok){
    return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function upLoadNewAvatar(tempUrl) {
  return fetch(`${API}wff-cohort-38/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: tempUrl
    })
  })
  .then((res) => {
    if (res.ok){
    return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
  })
}
