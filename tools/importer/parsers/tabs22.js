/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as required
  const headerRow = ['Tabs (tabs22)'];

  // Find the tab menu and the tab content containers
  const children = element.querySelectorAll(':scope > div');
  let tabMenu = null;
  let tabContent = null;
  children.forEach((div) => {
    if (div.classList.contains('w-tab-menu')) tabMenu = div;
    if (div.classList.contains('w-tab-content')) tabContent = div;
  });
  if (!tabMenu || !tabContent) return;

  // Get all tab links and tab panes
  const tabLinks = Array.from(tabMenu.querySelectorAll('a'));
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));
  const numRows = Math.min(tabLinks.length, tabPanes.length);
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    // Tab label
    let labelDiv = tabLinks[i].querySelector('div');
    let tabLabel = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();

    // Tab content: Only add text and images, ignore containing layout grid div
    let pane = tabPanes[i];
    let contentContainer = pane.querySelector('.w-layout-grid, .grid-layout');
    let cellContent = [];
    if (contentContainer) {
      // Grab heading (h3, h2, etc.) and all images inside that grid container
      let heading = contentContainer.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) cellContent.push(heading);
      let images = Array.from(contentContainer.querySelectorAll('img'));
      if (images.length) cellContent.push(...images);
    } else {
      // Fallback: add all text and images from pane
      let heading = pane.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) cellContent.push(heading);
      let images = Array.from(pane.querySelectorAll('img'));
      if (images.length) cellContent.push(...images);
    }
    rows.push([tabLabel, cellContent.length === 1 ? cellContent[0] : cellContent]);
  }

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
