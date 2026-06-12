// script.js
// Interactive Panini 2026 sticker tracker with consolidated view
// Renders all teams and their stickers in a single scrollable page. Provides filtering to show
// only missing stickers (status "Need") and exports missing sticker numbers per team. Uses
// localStorage to persist status between sessions.

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('teamsContainer');
  const filterSelect = document.getElementById('filterSelect');
  const exportBtn = document.getElementById('exportBtn');

  if (!container || !window.teamsData) {
    console.error('Required container or data missing');
    return;
  }

  // Create a sorted copy so we don't mutate the original data order
  const sortedTeams = window.teamsData.slice().sort((a, b) => a.page - b.page);
  // Keep references to section elements for filtering
  const sections = [];

  // Build the UI for each team
  sortedTeams.forEach(team => {
    const section = document.createElement('div');
    section.className = 'team-section';

    // Header element showing page, team and counts
    const header = document.createElement('div');
    header.className = 'team-header';
    header.textContent = buildHeaderText(team);
    section.appendChild(header);

    // Table element for the stickers
    const table = document.createElement('table');
    table.className = 'team-table';

    // Build the table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Sticker', 'Player', 'Status'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    // Build rows for stickers
    team.stickers.forEach(sticker => {
      const tr = document.createElement('tr');
      // Store sticker number on the row for easy lookup during filtering
      tr.dataset.sticker = sticker.number;
      tr.dataset.teamCode = team.code;

      // Sticker number cell
      const tdNum = document.createElement('td');
      tdNum.textContent = sticker.number;
      tr.appendChild(tdNum);

      // Player name cell (can be empty string)
      const tdName = document.createElement('td');
      tdName.textContent = sticker.name;
      tr.appendChild(tdName);

      // Status selector cell
      const tdStatus = document.createElement('td');
      const select = document.createElement('select');
      select.className = 'status-select';
      ['Need', 'Have', 'Duplicate'].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
      });
      // Load saved status from localStorage; default to 'Need' if none
      const saved = localStorage.getItem(sticker.number);
      if (saved) {
        select.value = saved;
      } else {
        select.value = 'Need';
      }
      // Persist changes and update header/filter when selection changes
      select.addEventListener('change', () => {
        localStorage.setItem(sticker.number, select.value);
        header.textContent = buildHeaderText(team);
        applyFilter();
      });
      tdStatus.appendChild(select);
      tr.appendChild(tdStatus);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    section.appendChild(table);
    container.appendChild(section);
    sections.push(section);
  });

  // Event listeners for filter and export controls
  if (filterSelect) {
    filterSelect.addEventListener('change', applyFilter);
  }
  if (exportBtn) {
    exportBtn.addEventListener('click', exportMissing);
  }

  // Initial filter application
  applyFilter();

  /**
   * Builds the header text for a given team, showing counts of Need, Have and Duplicate.
   * @param {Object} team
   */
  function buildHeaderText(team) {
    let needCount = 0;
    let haveCount = 0;
    let dupCount = 0;
    team.stickers.forEach(s => {
      const status = localStorage.getItem(s.number);
      if (status === 'Have') {
        haveCount++;
      } else if (status === 'Duplicate') {
        dupCount++;
      } else {
        // Treat undefined or 'Need' as missing
        needCount++;
      }
    });
    return `Page ${team.page}: ${team.name} — Need ${needCount}, Have ${haveCount}, Duplicates ${dupCount}`;
  }

  /**
   * Apply the selected filter to show either all stickers or only missing stickers.
   */
  function applyFilter() {
    const filterValue = filterSelect ? filterSelect.value : 'all';
    sections.forEach(section => {
      // Determine visibility of rows and section based on filter
      const rows = section.querySelectorAll('tbody tr');
      let hasVisibleRow = false;
      rows.forEach(row => {
        const stickerNum = row.dataset.sticker;
        const status = localStorage.getItem(stickerNum);
        let show = true;
        if (filterValue === 'need') {
          // Show row only if status is neither Have nor Duplicate
          if (status === 'Have' || status === 'Duplicate') {
            show = false;
          }
        }
        row.style.display = show ? '' : 'none';
        if (show) hasVisibleRow = true;
      });
      // Hide the entire team section if no rows are visible under 'need' filter
      if (filterValue === 'need') {
        section.style.display = hasVisibleRow ? '' : 'none';
      } else {
        section.style.display = '';
      }
    });
  }

  /**
   * Generate and download a text file containing missing sticker numbers per team.
   */
  function exportMissing() {
    const lines = [];
    sortedTeams.forEach(team => {
      const missing = team.stickers
        .filter(s => {
          const status = localStorage.getItem(s.number);
          // Missing if status is not Have and not Duplicate
          return !(status === 'Have' || status === 'Duplicate');
        })
        .map(s => s.number);
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
});