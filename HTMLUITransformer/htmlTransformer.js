import LinksTransformer from './linkTransformer'
import ElementAttributeTransformer from './elementAttributeTransformer'
import ContentTransformer from './contentTransformer'
import {
  socialLinks,
  linksContainer,
  profileContainer,
  socialLinksContainer,
  imgAvatarContainer,
  imgAvatarSrc,
  nameContainer,
  username,
  titleTag,
  name,
  bodyTag,
  backgroundGradientClass,
} from '../Util/constants'

class HTMLTransformer {
  constructor(htmlDocument, links) {
    this.htmlDocument = htmlDocument
    this.links = links
  }

  async fetchAllSocialResource() {
    return Promise.all(
      socialLinks.map(async (link) => {
        const { url, svgIconPath } = link
        const name = await fetch(svgIconPath).then((r) => r.text())

        return { name, url }
      }),
    )
  }

  async transformHTMLPage() {
    const { links, htmlDocument, fetchAllSocialResource } = this

    //Create a ContentTransformer and set Content
    const nameTransformerInstance = new ContentTransformer()
    const titleTagTransformerInstance = new ContentTransformer()
    nameTransformerInstance.content = username
    titleTagTransformerInstance.content = name

    //Fetch Social Links svgicons and Transform Link
    const sociaLinksFetched = await fetchAllSocialResource()

    //Update UI using HTMLRewriter API
    let transformedHTML = new HTMLRewriter()
      .on(linksContainer, new LinksTransformer(links)) //generate links
      .on(profileContainer, new ElementAttributeTransformer('style', '')) //unset display: none attribute
      .on(
        imgAvatarContainer,
        new ElementAttributeTransformer('src', imgAvatarSrc),
      ) //set avatar
      .on(nameContainer, nameTransformerInstance) //set username
      .on(socialLinksContainer, new ElementAttributeTransformer('style', '')) //unset display: none attribute
      .on(socialLinksContainer, new LinksTransformer(sociaLinksFetched)) //generate social links
      .on(titleTag, titleTagTransformerInstance) //set title tag to name
      .on(
        bodyTag,
        new ElementAttributeTransformer('class', backgroundGradientClass),
      ) //3. change background color
      .transform(htmlDocument)

    return transformedHTML
  }
}

export default HTMLTransformer
