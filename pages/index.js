import Card from "../scripts/components/card.js";
import FormValidator from "../scripts/components/FormValidator.js";

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/*
const card = new Card(cardData, "#card-template", (obj) => {
  console.log(obj);
});
card.getView();
*/

/* elements */

const modalAdd = document.querySelector(".js-add-modal");
const modalEdit = document.querySelector(".js-edit-modal");
const modalePreview = document.querySelector(".js-preview-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modelPreviewImageElement = document.querySelector(
  ".modal__preview-image"
);
const modalPreviewImageCaption = document.querySelector("#preview-caption");

const profilAddModal = document.querySelector("#profile-add-modal");
const profileCloseModal = modalEdit.querySelector("#profile-close-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-title-description"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addModalButton = document.querySelector("#profile-add-button");
const addModalCloseButton = modalAdd.querySelector("#add-close-modal");
const cardsAddForm = document.querySelector("#modal__form-add");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewModal = document.querySelector("#preview-modal");
const previewCloseModal = modalePreview.querySelector("#preview-close-modal");
/* functions */

// function toggleModalWindow(modal) {
//   modal.classList.toggle("modal_opened");
// }

function handleOverlayClick(event) {
  if (Array.from(event.target.classList).includes("modal")) {
    closeModal(event.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeClose);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeClose);
  modal.removeEventListener("click", handleOverlayClick);
}

function previewPicture() {
  // previewModal.classList.add("modal_opened");
  openModal(previewModal);
  // cards.classList.toggle("modal_opened");
}

/* Validation */

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElemenet = modalEdit.querySelector(".modal__form");
const addFormElemenet = modalAdd.querySelector(".modal__form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElemenet
);
const addFormValidator = new FormValidator(validationSettings, addFormElemenet);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__trash-button");
  const imageEl = cardElement.querySelector(".card__image");

  imageEl.alt = cardData.name;
  imageEl.src = cardData.link;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  imageEl.addEventListener("click", function () {
    modelPreviewImageElement.src = cardData.link;
    modelPreviewImageElement.alt = cardData.name;
    modalPreviewImageCaption.textContent = cardData.name;
    previewPicture();
  });

  cardLikeBtn.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", handleDeleteCard);

  return cardElement;
}*/

function renderCard(cardData, container) {
  const card = new Card(cardData, "#card-template", (obj) => {
    modelPreviewImageElement.src = obj.link;
    modelPreviewImageElement.alt = obj.name;
    modalPreviewImageCaption.textContent = obj.name;
    previewPicture();
  });
  container.prepend(card.getView());
}

/* event handelers */

const handleLikeIcon = (evt) => {
  evt.target.classList.toggle("card__like-button_active");
};

const handleDeleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

function handleEditProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleEscapeClose(e) {
  const key = e.code;

  if (key === "Escape") {
    const openModal = document.querySelector(".modal_opened");

    closeModal(openModal);
  }
}

/* event listeners */

profileEditButton.addEventListener("click", () => {
  // as a step 1 you need to fill the profile modal with data FIRST!
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addModalButton.addEventListener("click", () => openModal(profilAddModal));

cardsAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = cardsAddForm.querySelector("#profile-title-input").value;
  const link = cardsAddForm.querySelector("#profile-title-description").value;
  /*const newCard = getCardElement({ name, link });*/
  renderCard({ name, link }, cardListEl);
  cardsAddForm.reset(addFormValidator);
  closeModal(profilAddModal);
});

profileCloseModal.addEventListener("click", () => closeModal(profileEditModal));

addModalCloseButton.addEventListener("click", () => closeModal(profilAddModal));

previewCloseModal.addEventListener("click", () => closeModal(previewModal));

profileEditForm.addEventListener("submit", handleEditProfileSubmit);

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", (obj) => {
    modelPreviewImageElement.src = obj.link;
    modelPreviewImageElement.alt = obj.name;
    modalPreviewImageCaption.textContent = obj.name;
    previewPicture();
  });
  // const cardElement = getCardElement(cardData);
  renderCard(cardData, cardListEl);
});
