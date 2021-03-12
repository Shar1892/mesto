export class Section {
  constructor({items, renderer}, selector) {
    this._initalArray = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._initalArray.forEach((element) => {
      this._renderer(element);
    }); 
  }
}