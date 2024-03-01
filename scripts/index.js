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
const modalEditPopup = document.querySelector(".js-edit-popup");
const modalePreviewPopup = document.querySelector(".js-preview-popup");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modelPreviewImageElement = document.querySelector(
  ".modal__preview-image"
);
const modalPreviewImageCaption = document.querySelector("#preview-caption");

const profilAddModal = document.querySelector("#profile-add-modal");
const profileCloseModal = modalEditPopup.querySelector("#profile-close-modal");
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

// function toggleModalWindow(modal) {
//   modal.classList.toggle("modal_opened");
// }

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal() {
  document.querySelector(".modal_opened").classList.remove("modal_opened");
}

function previewPicture() {
  // previewModal.classList.add("modal_opened");
  openModal(previewModal);
  // cards.classList.toggle("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const imageEl = cardElement.querySelector(".card__image");
  imageEl.alt = cardData.name;
  imageEl.src = cardData.link;

  imageEl.addEventListener("click", function () {
    modelPreviewImageElement.src = cardData.link;
    modelPreviewImageElement.alt = cardData.name;
    modalPreviewImageCaption.textContent = cardData.name;
    previewPicture();
  });

  const deleteButton = cardElement.querySelector(".card__trash-button");
  console.log(deleteButton);
  deleteButton.addEventListener("click", function () {
    console.log(123);
    cardElement.remove();
  });
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    const cardLikeBtnActive = cardElement.querySelector(
      "#card__like-button_active"
    );
    cardLikeBtn.classList.toggle("card__like-button_active");
  });

  return cardElement;
}

function renderCard(cardData, container) {
  container.prepend(cardData);
}

/* event handelers */

function handleEditProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
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
  const newCard = getCardElement({ name, link });
  renderCard(newCard, cardListEl);
  closeModal(profilAddModal);
});

profileCloseModal.addEventListener("click", () => closeModal(profileEditModal));

addModalCloseButton.addEventListener("click", () => closeModal(profilAddModal));

previewCloseModal.addEventListener("click", () => closeModal(previewModal));

profileEditForm.addEventListener("submit", handleEditProfileSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  renderCard(cardElement, cardListEl);
});
