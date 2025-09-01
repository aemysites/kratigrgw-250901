/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all card anchors (a.utility-link-content-block) within grids, including nested
  function getCardsFromGrid(gridElem) {
    const cards = [];
    for (const child of Array.from(gridElem.children)) {
      if (child.matches('a.utility-link-content-block')) {
        cards.push(child);
      } else if (child.matches('.w-layout-grid')) {
        // If it's a nested grid, recurse
        cards.push(...getCardsFromGrid(child));
      }
    }
    return cards;
  }

  // Locate primary grid for card extraction
  let mainGrid = element.querySelector('.w-layout-grid');
  if (!mainGrid) mainGrid = element;

  const cards = getCardsFromGrid(mainGrid);

  // Prepare table rows
  const rows = [];
  rows.push(['Cards (cards37)']);
  cards.forEach(card => {
    // Get the main card image (first img in card)
    const img = card.querySelector('img');

    // Build text cell content: heading, paragraph(s), CTA
    const textContent = [];

    // Heading: use first h1-h6
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textContent.push(heading);

    // Paragraph(s)
    const paragraphs = Array.from(card.querySelectorAll('p'));
    if (paragraphs.length) textContent.push(...paragraphs);

    // CTA button or styled div (at the end of the card content)
    // Look for .button, a.button, button, or a[href]
    // If it's an <a> and not the card itself, include it
    let cta = card.querySelector('.button, a.button, button');
    // Avoid including the card link itself as CTA
    if (cta && cta !== card) textContent.push(cta);
    // There are also cases where the CTA is a <div class="button">
    // If so, include it only if it is not already included
    // (handled by the generic selector above)

    rows.push([
      img,
      textContent
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
