/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table header
  const headerRow = ['Accordion (accordion23)'];
  const rows = [headerRow];

  // Find all direct .divider children as accordion items
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    // Each divider should have a .w-layout-grid with two children
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (!grid) return; // skip if structure is unexpected
    const children = Array.from(grid.children);
    // Defensive: Only add row if both columns exist
    if (children.length >= 2) {
      rows.push([
        children[0], // Title cell (reference existing element)
        children[1]  // Content cell (reference existing element)
      ]);
    }
    // If less, skip (don't add an empty/incomplete row)
  });

  // Build and replace with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
