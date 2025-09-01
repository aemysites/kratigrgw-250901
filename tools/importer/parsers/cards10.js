/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly as in example
  const headerRow = ['Cards (cards10)'];
  // Find all card anchor elements that are direct children
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));
  const rows = [headerRow];
  cards.forEach(card => {
    // First column: image (must reference existing img element)
    const imageWrapper = card.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imageWrapper) {
      img = imageWrapper.querySelector('img'); // reference directly, do not clone
    }
    // Second column: text content wrapper
    // Includes tag (if present), heading, paragraph, etc.
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // Defensive: only add row if both cells exist
    if (img && textContainer) {
      rows.push([img, textContainer]);
    }
    // Edge case: handle missing image or text (not expected in given HTML, but robust)
    else if (img) {
      rows.push([img, '']);
    } else if (textContainer) {
      rows.push(['', textContainer]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
