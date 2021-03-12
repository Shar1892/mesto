import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._image = this._element.querySelector('.overlay__image');
    this._imageName = this._element.querySelector('.overlay__image-name');
  }

  open(data) {
    super.open();
    this._image.src = data.link;
    this._image.alt = data.name;
    this._imageName.textContent = data.name;
  }
}