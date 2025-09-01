/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in example
  const cells = [['Cards (cards25)']];

  // Get all direct card divs in the block
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(card => {
    // Find the first child <img> element in the card (may be nested)
    const img = card.querySelector('img');
    
    // Try to find the text content container (usually utility-padding-all-2rem)
    let textCellContent = [];
    const textContainer = card.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      // Find the heading (usually <h3>) and the description (<p>)
      const heading = textContainer.querySelector('h3');
      if (heading) textCellContent.push(heading);
      const desc = textContainer.querySelector('p');
      if (desc) textCellContent.push(desc);
    }
    // If there's no textContainer, leave the cell empty string
    if (textCellContent.length === 0) textCellContent = '';

    // Add the card row: [image, text]
    cells.push([img, textCellContent]);
  });

  // Create the table block and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
