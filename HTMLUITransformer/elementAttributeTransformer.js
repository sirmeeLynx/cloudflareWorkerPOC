class ElementAttribute {
  constructor(attributeName, attributeValue) {
    this.attributeName = attributeName
    this.attributeValue = attributeValue
  }

  async element(element) {
    const { attributeName, attributeValue } = this

    element.setAttribute(attributeName, attributeValue)
  }
}

export default ElementAttribute
