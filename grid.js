// grid.js
// Grid-style Panini 2026 sticker tracker.  Displays all teams as rows and the 20 stickers as
// columns. Each cell contains the sticker number label and a drop-down to mark the sticker
// as Need, Have or Duplicate. Includes filtering to hide collected stickers and exporting
// missing stickers per team. All status data is persisted in localStorage.

document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('gridTable');
  const filterSelect = document.getElementById('filterSelect');
  const exportBtn = document.getElementById('exportBtn');

  if (!table || !window.teamsData) {
    console.error('Required table element or teamsData missing');
    return;
  }

  // Sort teams by page number (ascending) to match album order
  const sortedTeams = window.teamsData.slice().sort((a, b) => a.page - b.page);
  const rowsList = [];

  // Build the header row (first column is Team names)
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const teamHeader = document.createElement('th');
  teamHeader.textContent = 'Team';
  headerRow.appendChild(teamHeader);
  for (let i = 1; i <= 20; i++) {
    const th = document.createElement('th');
    th.textContent = i;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  // Build a row for each team
  sortedTeams.forEach(team => {
    const tr = document.createElement('tr');
    tr.dataset.teamCode = team.code;
    // Team name cell
    const tdTeam = document.createElement('td');
    tdTeam.textContent = team.name;
    tr.appendChild(tdTeam);
    // Create one cell per sticker
    team.stickers.forEach((sticker, index) => {
      const td = document.createElement('td');
      td.dataset.sticker = sticker.number;
      // Layout container inside cell
      const cellContainer = document.createElement('div');
      cellContainer.style.display = 'flex';
      cellContainer.style.flexDirection = 'column';
      cellContainer.style.alignItems = 'center';
      // Label for sticker number
      const label = document.createElement('small');
      label.textContent = sticker.number;
      // Select element for status
      const select = document.createElement('select');
      select.className = 'status-select';
      ['Need', 'Have', 'Duplicate'].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
      });
      // Load saved status or default to Need
      const saved = localStorage.getItem(sticker.number);
      if (saved) {
        select.value = saved;
      } else {
        select.value = 'Need';
      }
      // Persist status and re-filter when changed
      select.addEventListener('change', () => {
        localStorage.setItem(sticker.number, select.value);
        applyFilter();
      });
      // Assemble cell
      cellContainer.appendChild(label);
      cellContainer.appendChild(select);
      td.appendChild(cellContainer);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    rowsList.push(tr);
  });
  table.appendChild(tbody);

  // Apply filter to show/hide cells and rows
  function applyFilter() {
    const filterValue = filterSelect ? filterSelect.value : 'all';
    rowsList.forEach(row => {
      let visibleCellCount = 0;
      // Iterate over cells after the team name (skip first cell)
      for (let i = 1; i < row.children.length; i++) {
        const cell = row.children[i];
        const stickerNum = cell.dataset.sticker;
        const status = localStorage.getItem(stickerNum);
        let showCell = true;
        if (filterValue === 'need') {
          if (status === 'Have' || status === 'Duplicate') {
            showCell = false;
          }
        }
        cell.style.display = showCell ? '' : 'none';
        if (showCell) visibleCellCount++;
      }
      // Show or hide entire row under missing filter if no visible cells
      if (filterValue === 'need') {
        row.style.display = visibleCellCount > 0 ? '' : 'none';
      } else {
        row.style.display = '';
      }
    });
  }

  // Export missing stickers per team to a text file
  function exportMissing() {
    const lines = [];
    sortedTeams.forEach(team => {
      const missing = team.stickers.filter(s => {
        const status = localStorage.getItem(s.number);
        return !(status === 'Have' || status === 'Duplicate');
      }).map(s => s.number);
      if (missing.length > 0) {
        lines.push(`${team.code}: ${missing.join(', ')}`);
      }
    });
    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'missing_stickers.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Attach event listeners
  if (filterSelect) {
    filterSelect.addEventListener('change', applyFilter);
  }
  if (exportBtn) {
    exportBtn.addEventListener('click', exportMissing);
  }
  // Run initial filter
  applyFilter();
});