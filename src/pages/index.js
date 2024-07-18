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
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import UserInfo from "../components/Userinfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";

//Api

const api = new Api({
  authorization: "91a10936-bcf5-444e-a37c-1d53d5865859",
  "Content-Type": "application/json",
});
/* Class Instances */

let section; // undefined

api
  .getUserInfo()
  .then((data) => {
    console.log(data); ///take this out this was to make sure right thing was being called
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((result) => {
    section = new Section(
      {
        items: result,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          section.addItem(cardElement);
          //renderCard(cardData);
        },
      },
      ".cards__list"
    );
    section.renderItems();
    console.log(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

function handleEditProfileSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.title, inputValues.description);
  profileEditPopup.close();
  api
    .updateProfileInfo(name, description)
    .then((userData) => {
      console.log(userData);
      userInfo.setUserInfo(userData);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.close(false);
    });
}
function handleAddCardSubmit(inputValues) {
  /*const newCard = getCardElement({ name, link });*/
  const cardData = { name: inputValues.title, link: inputValues.description };

  api
    .createNewCard({ name: cardData.name, link: cardData.link })
    .then((data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
      newCardPopup.close();
      newCardPopup.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addFormValidator.toggleButtonState();
    });
}

function handleDeleteCard(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      console.log("Card deleted successfully");
      card.remove();
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    });
}

function handleCardLike(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card._id)
      .then(() => {
        card.updateIsLiked();
      })
      .catch((error) => console.error("Error deleting card:", error));
  } else {
    api
      .likeCard(card._id)
      .then(() => {
        card.updateIsLiked(true);
      })
      .catch((error) => console.error("Error deleting card:", error));
  }
}

/*function handleCardDisLike(card) {
  api
  .likeCard(card.getCardId())
  .then(() => {
    card.dislike();
  })
  .catch((error) => {
    console.error("Error deleting card:", error);
  });
}*/

/*const cardElement = createCard(cardData);
section.addItem(cardElement);
newCardPopup.reset();
newCardPopup.close();
addFormValidator.toggleButtonState();*/

const popupImage = new PopUpWithImage({
  popupSelector: "#preview-modal",
});
popupImage.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleAddCardSubmit,
});
newCardPopup.setEventListeners();

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleEditProfileSubmit,
});

const avatarEditModal = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: handleAvatarSubmit,
});

//Profile creation and editing

const profileAvatar = document.querySelector(".profile__image-container");

profileAvatar.addEventListener("click", () => avatarEditModal.open());

avatarEditModal.setEventListeners();

function handleAvatarSubmit({ link }) {
  avatarEditModal.renderLoading(true);

  api
    .updateAvatar(link)
    .then(() => {
      userInfo.setAvatar(link);
      avatarEditModal.close();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(() => {
      avatarEditModal.renderLoading(false);
    });
}

//FORM VALIDATION
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
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleCardLike
    /*handleCardDisLike*/
  );
  const cardElement = card.getView();
  return cardElement;
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

// fetch requests
/*const myObj = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify(myObj),
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });*/
