const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];
/* elements */

const modalAddPopup = document.querySelector(".js-add-popup");
const modaleditPopup = document.querySelector(".js-edit-popup");
const modalePreviewPopup = document.querySelector(".js-preview-popup");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modelPreviewImageElement = document.querySelector(
  ".modal__preview-image"
);
const trashCardsButton = document.querySelector("card__trash-button");
const trashCardCloseButton = document.querySelector("Js-trash-button");
const profiladdModal = document.querySelector("#profile-add-modal");
const profileCloseModal = modaleditPopup.querySelector("#profile-close-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-title-description"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addModalButton = document.querySelector("#profile-add-button");
const addModalCloseButton = modalAddPopup.querySelector("#add-close-modal");
const cardsAddForm = document.querySelector("#modal__form-add");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewModal = document.querySelector("#preview-modal");
const previewCloseModal = modalePreviewPopup.querySelector(
  "#preview-close-modal"
);
/* functions */

function toggleModalWindow(modal) {
  modal.classList.toggle("modal_opened");
}

function previewPicture({ name, link }) {
  previewModal.classList.add("modal_opened");
  // cards.classList.toggle("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const imageEl = cardElement.querySelector(".card__image");
  imageEl.style.backgroundImage = `url(${cardData.link})`;

  imageEl.addEventListener("click", function () {
    modelPreviewImageElement.src = cardData.link;
    previewPicture({
      link: cardData.link,
      name: cardData.name,
    });
  });

  const deleteButton = cardElement.querySelector(".card__trash-button");
  console.log(deleteButton);
  deleteButton.addEventListener("click", function () {
    console.log(123);
    cardElement.remove();
  });
  //set the image alt text to the name field of the object
  //set the card title to the name field of the object, too

  //return the ready HTML element with the filled-in data
  return cardElement;
}

function rendercard(cardData, container) {
  container.prepend(cardData);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

/* event handelers */

function handleEditProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

/* event listeners */

profileEditButton.addEventListener("click", () =>
  toggleModalWindow(profileEditModal)
);

addModalButton.addEventListener("click", () =>
  toggleModalWindow(profiladdModal)
);

cardsAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  rendercard({
    name,
    link,
  });
  rendercard(cardElement, cardListEl);
  closePopup(modalAddPopup);
});

profileCloseModal.addEventListener("click", () => closePopup(profileEditModal));

addModalCloseButton.addEventListener("click", () => closePopup(profiladdModal));

previewCloseModal.addEventListener("click", () => closePopup(previewModal));

profileEditForm.addEventListener("submit", handleEditProfileSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  rendercard(cardElement, cardListEl);
});
