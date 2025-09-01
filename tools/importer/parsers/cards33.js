/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];
  // Each card is an <a> directly under the main grid
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach(card => {
    // First image in card
    const img = card.querySelector('img');
    // Find the text container: in this structure, it's the first div after the image
    let textContentDiv = null;
    const innerGrid = card.querySelector('div.w-layout-grid');
    if (innerGrid) {
      // The text is inside a div after the image within grid
      const divs = Array.from(innerGrid.children).filter(child => child.tagName === 'DIV');
      // Typically, the second div contains the text content
      if (divs.length === 2) {
        textContentDiv = divs[1];
      } else {
        // fallback: the div that is not a flex row (not the tags/time row)
        textContentDiv = divs.find(div => div.querySelector('h3, h4, p')) || divs[0];
      }
    }
    // Fallback: if not found, use the first <h3>, <h4>, or <p> parent div in the card
    if (!textContentDiv) {
      textContentDiv = card.querySelector('h3, h4, p')?.parentElement;
    }
    // Defensive: If still missing, put placeholder span (should not happen for valid cards)
    if (!img || !textContentDiv) return;
    rows.push([img, textContentDiv]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
