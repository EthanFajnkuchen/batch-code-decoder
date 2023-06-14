const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const exp = require("constants");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function decodeBatchCode(batchCode) {
  const letter = batchCode[0];
  const year = parseInt(batchCode.substr(1, 2));
  const week = parseInt(batchCode.substr(3, 2));
  const day = parseInt(batchCode.substr(5));

  // Determine the date based on the year, week, and day
  const startOfYear = new Date(year + 2000, 0, 1);
  const startOfWeek = new Date(
    startOfYear.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000
  );
  const targetDate = new Date(
    startOfWeek.getTime() + (day - 1) * 24 * 60 * 60 * 1000
  );
  return targetDate;
}

function addThreeYears(date) {
  var newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 3);
  newDate.setDate(newDate.getDate() - 1);
  return newDate;
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", function (req, res) {
  const formData = req.body;
  let tableRows = "";
  if (Object.keys(req.body).length === 0) {
    res.send("<h1>No Batch Code entered!</h1>");
  }
  for (const [name, value] of Object.entries(formData)) {
    let production_date = decodeBatchCode(value);
    let expiration_date = addThreeYears(production_date);
    tableRows += `
        <tr>
          <td>${value}</td>
          <td>${production_date.toLocaleDateString("fr-FR")}</td>
          <td>${expiration_date.toLocaleDateString("efr-FR")}</td>
        </tr>`;
  }

  const tableHtml = `
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid #000;
        padding: 8px;
      }
      td:not(:last-child) {
        border-right: none;
      }
      tr:not(:last-child) td {
        border-bottom: 1px solid #000;
      }
    </style>
    <table>
      <thead>
        <tr>
          <th>Value</th>
          <th>Production Date</th>
          <th>Expiration Date</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>`;

  res.send(tableHtml);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
