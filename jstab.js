(() => {
  const tables = document.querySelectorAll("table");
  if (!tables.length) {
    alert("No tables found on this page.");
    return;
  }

  let csvRows = [];
  tables.forEach((table, index) => {
    csvRows.push(`"--- Table ${index + 1} ---"`);
    table.querySelectorAll("tr").forEach(row => {
      const cells = Array.from(row.querySelectorAll("th, td")).map(cell => {
        const text = cell.innerText.replace(/\s+/g, " ").trim();
        return `"${text.replace(/"/g, '""')}"`;
      });
      if (cells.length) csvRows.push(cells.join(","));
    });
    csvRows.push("");
  });

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sample-table.csv";
  link.click();
})();
