import ContentTransformer from './contentTransformer'

class LinksTransformer extends ContentTransformer {
  constructor(links) {
    super()
    this.links = links
    this.generateLinksHTML = this.generateLinksHTML.bind(this)
  }

  generateLinksHTML() {
    const linksHTML = this.links.map(
      (link) => `<a href="${link.url}">${link.name}</a>`,
    )

    return linksHTML.join('\n')
  }

  async element(element) {
    const { generateLinksHTML } = this

    const content = generateLinksHTML()
    super.content = content

    super.element(element)
  }
}

export default LinksTransformer
