export default class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleCardLike,
    handleCardDislike
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    //this._handleCardLike = handleCardLike;
    //this._handleCardDislike = handleCardDislike;
    //this._isLiked = data_isLiked;
  }
  getCardId() {
    return this._id;
  }

  _setEventListeners() {
    // ".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.like();
      });

    //".card__trash-button"
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ name: this._name, link: this._link })
      );
  }

  like() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
    //this._isLiked = true;
  }

  dislike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.remove("card__like-button_active");
    //this._isLiked = false;
  }

  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get the card view
    // set eventn listeners
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    // return the card

    return this._cardElement;
  }
}
