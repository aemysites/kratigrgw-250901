/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must match example exactly
  const headerRow = ['Cards (cards28)'];
  const cardRows = [];
  // Find all .w-tab-pane blocks in the element
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));
  tabPanes.forEach(tabPane => {
    // Each tab pane contains one grid of cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      // Each card is a direct child <a>
      Array.from(grid.children).forEach(card => {
        // --- IMAGE ---
        let imgEl = null;
        // Try div.utility-aspect-3x2 > img.cover-image
        let imgContainer = card.querySelector('.utility-aspect-3x2');
        if (imgContainer) {
          const img = imgContainer.querySelector('img.cover-image');
          if (img) imgEl = img;
        }
        if (!imgEl) {
          // Fallback: direct img.cover-image
          const img = card.querySelector('img.cover-image');
          if (img) imgEl = img;
        }
        // --- TEXT ---
        let textContent = [];
        // Find heading in card or nested utility-text-align-center
        let heading = card.querySelector('.h4-heading');
        if (!heading) {
          const inner = card.querySelector('.utility-text-align-center');
          if (inner) heading = inner.querySelector('.h4-heading');
        }
        if (heading) textContent.push(heading);
        // Find paragraph in card or nested utility-text-align-center
        let desc = card.querySelector('.paragraph-sm');
        if (!desc) {
          const inner = card.querySelector('.utility-text-align-center');
          if (inner) desc = inner.querySelector('.paragraph-sm');
        }
        if (desc) textContent.push(desc);
        // Only push if at least one content
        if (imgEl || textContent.length) {
          cardRows.push([imgEl || '', textContent.length ? textContent : '']);
        }
      });
    }
  });
  const cells = [headerRow, ...cardRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
