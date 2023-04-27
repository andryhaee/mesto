class Section {
  constructor(renderer, selectorContainer) {
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer)
  };

  renderItems(item) {
    item.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(item) {
    this._container.append(item);
  };

  addItemNew(item) {
    this._container.prepend(item);
  }
}

export default Section;
