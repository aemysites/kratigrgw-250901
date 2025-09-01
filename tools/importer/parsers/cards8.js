/* global WebImporter */
export default function parse(element, { document }) {
  // Header as in example
  const headerRow = ['Cards (cards8)'];
  // Each card is a direct child div
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  // For this HTML, each card only contains an image, so text content is empty
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Reference the existing <img> element, if one exists
    const img = cardDiv.querySelector('img');
    // Only add the row if there's an image
    if (img) {
      return [img, ''];
    } else {
      // If no img, just put two empty cells to preserve structure
      return ['', ''];
    }
  });
  // Compose the table
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the element with the new table
  element.replaceWith(table);
}
