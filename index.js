import HTMLTransformer from './HTMLUITransformer/htmlTransformer'
import { links, staticHtmlUrl } from './Util/constants'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with JSON Array
 * when links is requested
 * and Links-Tree Styled WebPage
 * When other path is requested
 * @param {Request} request
 */
async function handleRequest(request) {
  const arrPath = request.url.match(/links$/)
  const path = arrPath ? arrPath[0] : null

  //0. request handler to respond to the path `/links`
  if (path != null) {
    return new Response(JSON.stringify(links, null, 2), {
      headers: { 'content-type': 'application/json' },
    })
  }

  //1. Retrieve a static HTML page
  const staticHTMLPage = await fetch(staticHtmlUrl)

  /*2. Get the links from your previously deployed JSON response
   *3. Use HTMLRewriter to add these links to the static HTML page
   *4. Return the transformed HTML page from the Worker
   */
  return new HTMLTransformer(staticHTMLPage, links).transformHTMLPage()
}
