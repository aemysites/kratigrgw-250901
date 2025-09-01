/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header matches example
  const headerRow = ['Cards (cardsNoImages19)'];
  const cells = [headerRow];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(card => {
    // Only interested in the paragraph/content, not the SVG icon
    // Find the <p> inside the card
    const para = card.querySelector('p');
    if (para) {
      cells.push([para]);
    }
  });

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
