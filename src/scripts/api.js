

const API_URL = "https://nomoreparties.co/v1/wff-cohort-38/";
const authorizationKey = "4601d008-a405-4f80-81df-1bf2249ca44f";


function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


export function getCustomerInfo() {
  return fetch(`${API_URL}users/me`, {
    method: 'GET',
    headers: {
    authorization: authorizationKey
  }
  })
  .then(handleResponse)
}

export function upLoadProfileInfo(nameValue, aboutValue) {
  return fetch(`${API_URL}users/me`, {
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
.then(handleResponse)
}

export function upLoadNewCard(nameValue, urlValue) {
  return fetch(`${API_URL}cards`, {
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
.then(handleResponse)
}

export function cardsLoad() {
  return fetch (`${API_URL}cards`, {
     method: 'GET',
    headers: {
    authorization: authorizationKey
    }
  })
  .then(handleResponse);
}

export function cardDelete(cardId) {
  return fetch (`${API_URL}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
    authorization: authorizationKey
    }
  })
}

export function likeCard(cardId) {
  return fetch (`${API_URL}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
    authorization: authorizationKey
    }
  })
  .then(handleResponse)
}

export function unLikeCard(cardId) {
  return fetch (`${API_URL}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
    authorization: authorizationKey
    }
  })
  .then(handleResponse)
}

export function upLoadNewAvatar(tempUrl) {
  return fetch(`${API_URL}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: tempUrl
    })
  })
  .then(handleResponse)
}
