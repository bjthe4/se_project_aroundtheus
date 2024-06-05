import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import UserInfo from "../components/Userinfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";

/* elements */
const modalAdd = document.querySelector(".js-add-modal");
const modalEdit = document.querySelector(".js-edit-modal");
const modalePreview = document.querySelector(".js-preview-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalPreviewImageElement = document.querySelector(
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

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElemenet = modalEdit.querySelector(".modal__form");
const addFormElemenet = modalAdd.querySelector(".modal__form");

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
/* Class Instances */
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      console.log(cardData);
    },
  },
  ".cards__list"
);

section.renderItems();

const popupImage = new PopUpWithImage({
  popupSelector: "#preview-modal",
  modalPreviewImageElement,
  modalPreviewImageCaption,
});
popupImage.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleAddCardSubmit,
});
newCardPopup.setEventListeners();

const userInfo = new UserInfo(".profile__title", ".profile__description");

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleEditProfileSubmit,
});

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElemenet
);
const addFormValidator = new FormValidator(validationSettings, addFormElemenet);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileEditPopup.setEventListeners();

/*
const card = new Card(cardData, "#card-template", (obj) => {
  console.log(obj);
});  
card.getView();
*/

/* functions */

// function toggleModalWindow(modal) {
//   modal.classList.toggle("modal_opened");
// }

/*function handleOverlayClick(event) {
  if (Array.from(event.target.classList).includes("modal")) {
    closeModal(event.target);
  }
}*/

/*function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeClose);
  modal.addEventListener("click", handleOverlayClick);
}*/

/*function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeClose);
  modal.removeEventListener("click", handleOverlayClick);
}*/

function previewPicture() {
  // previewModal.classList.add("modal_opened");
  // openModal(previewModal);
  // cards.classList.toggle("modal_opened");
}

function handleImageClick(data) {
  popupImage.open(data);
}

/*function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}*/

function handleAddCardSubmit(inputValues) {
  /*const newCard = getCardElement({ name, link });*/
  renderCard({ name: inputValues.title, link: inputValues.description });
  newCardPopup.reset();
  newCardPopup.close();
  addFormValidator.toggleButtonState();
}

/* Validation */

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
  const card = new Card(cardData, "#card-template", handleImageClick);
  // container.prepend(card.getView());
  section.addItem(card.getView());
}

/* event handelers */

/*const handleLikeIcon = (evt) => {
  evt.target.classList.toggle("card__like-button_active");
};*/

/*const handleDeleteCard = (evt) => {
  evt.target.closest(".card").remove();
};*/

function handleEditProfileSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.title, inputValues.description);
  profileEditPopup.close();
}

/*function handleEscapeClose(e) {
  const key = e.code;

  if (key === "Escape") {
    const openModal = document.querySelector(".modal_opened");

    closeModal(openModal);
  }
}*/

/* event listeners */

profileEditButton.addEventListener("click", () => {
  // as a step 1 you need to fill the profile modal with data FIRST!
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
});

addModalButton.addEventListener("click", () =>
  newCardPopup.open(profilAddModal)
);

/*cardsAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = cardsAddForm.querySelector("#profile-title-input").value;
  const link = cardsAddForm.querySelector("#profile-title-description").value;
  renderCard({ name, link }, cardListEl);
  cardsAddForm.reset();
  addFormValidator.toggleButtonState();
  closeModal(profilAddModal);
});*/

/*const newCard = getCardElement({ name, link });*/
profileCloseModal.addEventListener("click", () =>
  profileEditPopup.close(profileEditModal)
);

addModalCloseButton.addEventListener("click", () =>
  newCardPopup.close(profilAddModal)
);

previewCloseModal.addEventListener("click", () =>
  popupImage.close(previewModal)
);

initialCards.forEach((cardData) => {
  // const cardElement = getCardElement(cardData);
  renderCard(cardData, cardListEl);
});
