class Section {
  constructor({items, renderer}, selectorContainer) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer)
  };

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(item) {
    this._container.prepend(item);
  };
}

export default Section;
