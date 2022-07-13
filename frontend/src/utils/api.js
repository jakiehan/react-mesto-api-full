class Api {
  constructor() {
    this._url = 'https://api.mesto-jaki.nomorepartiesxyz.ru';
  }

  _makeRequest(promise) {
    return promise.then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res.status;
    }).then(obj => {
      return obj;
    })
  }

  getUserInfo(jwt) {
    const promise = fetch(`${this._url}/users/me`, {
      headers: {
        method: 'GET',
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      }
    })
    return this._makeRequest(promise)
  }

  getCards(jwt) {
    const promise = fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
    return this._makeRequest(promise)
  }

  setUserInfo({ name, about }, jwt ) {
    const promise = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    return this._makeRequest(promise)
  }

  uploadCard({ name, link }, jwt) {
    const promise = fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    return this._makeRequest(promise)
  }

  deleteCard(id, jwt) {
    const promise = fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
    return this._makeRequest(promise)
  }

  changeLikeCardStatus(id, status, jwt) {
    const method = (status ? 'PUT' : 'DELETE')
    const promise = fetch(`${this._url}/cards/${id}/likes`, {
      method: method,
      headers: {
        authorization: `Bearer ${jwt}`
      }
    })
    return this._makeRequest(promise)
  }

  setUserAvatar({ avatar }, jwt) {
    const promise = fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    return this._makeRequest(promise)
  }
}

const api = new Api();

export default api;