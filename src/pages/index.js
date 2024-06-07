import {
  validationSettings,
  initialCards,
  modalAdd,
  modalEdit,
  modalePreview,
  profileEditButton,
  profileEditModal,
  modalPreviewImageElement,
  modalPreviewImageCaption,
  profilAddModal,
  profileCloseModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addModalButton,
  addModalCloseButton,
  cardsAddForm,
  cardListEl,
  cardTemplate,
  previewModal,
  previewCloseModal,
  editFormElemenet,
  addFormElemenet,
} from "../utils/constants.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import UserInfo from "../components/Userinfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";

/* Class Instances */
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
      //renderCard(cardData);
    },
  },
  ".cards__list"
);

section.renderItems();

const popupImage = new PopUpWithImage({
  popupSelector: "#preview-modal",
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

//function previewPicture() {
// previewModal.classList.add("modal_opened");
// openModal(previewModal);
// cards.classList.toggle("modal_opened");
//}

function handleImageClick(data) {
  popupImage.open(data);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function handleAddCardSubmit(inputValues) {
  /*const newCard = getCardElement({ name, link });*/
  const cardData = { name: inputValues.title, link: inputValues.description };
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
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

/*function renderCard(cardData, container) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  // container.prepend(card.getView());
  section.addItem(card.getView());
}*/

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
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.about;
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
// profileCloseModal.addEventListener("click", () =>
//   profileEditPopup.close(profileEditModal)
// );

// addModalCloseButton.addEventListener("click", () =>
//   newCardPopup.close(profilAddModal)
// );

// previewCloseModal.addEventListener("click", () =>
//   popupImage.close(previewModal)
// );

//initialCards.forEach((cardData) => {
// const cardElement = getCardElement(cardData);
//renderCard(cardData, cardListEl);
// const card = new Card(cardData, "#card-template", () => {
//   console.log(123);
// });

// const cardElement = card.getView();
//});
