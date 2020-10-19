class ContentTransformer {
  constructor(contentOption = { html: true }) {
    this._content = null
    this._contentOption = contentOption
  }

  set content(content) {
    this._content = content
  }

  element(element) {
    const { _content, _contentOption } = this

    element.setInnerContent(_content, _contentOption)
  }
}

export default ContentTransformer
