// script.js
// This file drives the interactive Panini 2026 sticker tracker.  It renders all teams and their
// stickers, remembers your collection status using localStorage and updates progress summaries
// automatically.  No external libraries are required.

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('teamsContainer');
  if (!container || !window.teamsData) {
    console.error('Container or teamsData missing');
    return;
  }

  // Create an entry for each team
  window.teamsData.sort((a, b) => a.page - b.page).forEach(team => {
    const details = document.createElement('details');
    details.className = 'team-section';
    const summary = document.createElement('summary');
    summary.className = 'team-summary';
    summary.textContent = buildSummaryText(team);
    details.appendChild(summary);

    // Build table of stickers
    const table = document.createElement('table');
    table.className = 'team-table';
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
    team.stickers.forEach(sticker => {
      const tr = document.createElement('tr');
      // Sticker number
      const tdNum = document.createElement('td');
      tdNum.textContent = sticker.number;
      tr.appendChild(tdNum);
      // Player name
      const tdName = document.createElement('td');
      tdName.textContent = sticker.name;
      tr.appendChild(tdName);
      // Status selector
      const tdStatus = document.createElement('td');
      const select = document.createElement('select');
      select.className = 'status-select';
      ['Need','Have','Duplicate'].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
      });
      // Load saved status
      const saved = localStorage.getItem(sticker.number);
      if (saved) select.value = saved;
      // Update counts when changed
      select.addEventListener('change', () => {
        localStorage.setItem(sticker.number, select.value);
        // update the summary for this team
        summary.textContent = buildSummaryText(team);
      });
      tdStatus.appendChild(select);
      tr.appendChild(tdStatus);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    details.appendChild(table);
    container.appendChild(details);
  });

  // Helper to build summary text including counts
  function buildSummaryText(team) {
    let have = 0;
    let dup = 0;
    team.stickers.forEach(s => {
      const status = localStorage.getItem(s.number);
      if (status === 'Have') have++;
      if (status === 'Duplicate') dup++;
    });
    return `Page ${team.page}: ${team.name} — Have ${have}/${team.stickers.length}, Duplicates ${dup}`;
  }
});