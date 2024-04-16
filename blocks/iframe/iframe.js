async function createIframe(url) {
  const iframeContainer = document.createElement('div');
  iframeContainer.classList.add('iframeContainer_container');
  iframeContainer.innerHTML += `
  <iframe id="iframe-content" src="${url}" loading="lazy"></iframe>
`;
  return iframeContainer;
}

/**
 * loads and decorates the iframe
 * @param {Element} block The iframe block element
 */
export default async function decorate(block) {
  const iframeElm = block.querySelector('a');
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('iframeContainer_wrapper');

  if (iframeElm) {
    parentDiv.append(await createIframe(iframeElm.href));
    iframeElm.replaceWith(parentDiv);
  }
}
