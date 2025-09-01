/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as specified
  const headerRow = ['Cards (cards6)'];
  // Each direct child of element is a card container
  const cardDivs = element.querySelectorAll(':scope > div');
  // For each card, extract the <img> element (mandatory) for the first cell
  // No text content is present in the HTML, so the second cell is left empty
  const rows = Array.from(cardDivs).map(div => {
    const img = div.querySelector('img');
    return [img, ''];
  });
  // Compose the table structure
  const tableArray = [headerRow, ...rows];
  // Create the block table using WebImporter helper
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  // Replace the original element with the newly created table
  element.replaceWith(table);
}
