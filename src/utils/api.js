class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getUrl(endpoint) {
    return `${this.baseUrl}/${endpoint}`;
  }

  _fetch(endpoint, method = "GET", body) {
    return fetch(this._getUrl(endpoint), {
      headers: this.headers,
      method,
      body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _addLikeDataToCard(card) {
    const isLiked = card.likes.some(
      (likeOwner) => likeOwner._id === this.userId
    );
    const likeCount = card.likes.length;

    return {
      ...card,
      isLiked,
      likeCount,
    };
  }

  getCards() {
    return this._fetch("cards").then((cards) => cards.reverse());
  }

  getUserInfo() {
    return this._fetch("users/me");
  }

  editUserInfo({ name, about }) {
    const body = JSON.stringify({ name, about });
    return this._fetch("users/me", "PATCH", body);
  }

  editUserAvatar({ avatar }) {
    const body = JSON.stringify({ avatar });
    return this._fetch("users/me/avatar", "PATCH", body);
  }

  createNewCard({ name, link }) {
    const body = JSON.stringify({ name, link });
    return this._fetch("cards", "POST", body);
  }

  deleteCard(cardId) {
    return this._fetch(`cards/${cardId}`, "DELETE");
  }

  likeCard(cardId) {
    return this._fetch(`cards/likes/${cardId}`, "PUT").then((card) =>
      this._addLikeDataToCard(card)
    );
  }

  unlikeCard(cardId) {
    return this._fetch(`cards/likes/${cardId}`, "DELETE").then((card) =>
      this._addLikeDataToCard(card)
    );
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
  headers: {
    authorization: "aa992fe4-15de-4409-8cc8-a42b7316beae",
    "Content-Type": "application/json",
  },
});
