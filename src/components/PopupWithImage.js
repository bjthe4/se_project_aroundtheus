import Popup from "./Popup.js";

export default class PopUpWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._modalPreviewImageElement = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._previewCaptionEleement =
      this._popupElement.querySelector("#preview-caption");
  }
  open(data) {
    this._modalPreviewImageElement.src = data.link;
    this._modalPreviewImageElement.alt = data.name;
    this._modalPreviewImageCaption.textContent = data.name;
    super.open();
  }
}
