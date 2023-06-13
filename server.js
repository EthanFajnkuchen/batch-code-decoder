const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require('body-parser');
const exp = require("constants");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


function decodeBATCHCode(code) {
  var year = parseInt(code.substr(1, 2));
  var week = parseInt(code.substr(3, 2));
  var dayOfWeek = parseInt(code.substr(5, 1));

  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth();
  var currentDate = now.getDate();
  var currentDayOfWeek = now.getDay();

  var date = new Date(currentYear, 0, 1); // Set the date to the first day of the current year

  // Adjust the date to the corresponding week and day
  date.setDate(date.getDate() + (week - 1) * 7 + (dayOfWeek));

  // Adjust the date to the corresponding year
  if (date.getMonth() > currentMonth || (date.getMonth() === currentMonth && date.getDate() > currentDate)) {
    date.setFullYear(currentYear - 1);
  } else {
    date.setFullYear(currentYear);
  }

  return date;
}

function addThreeYears(date) {
    var newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 3);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  }
  
  

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});


app.post("/", function(req,res) {
    const formData = req.body;
    let tableRows = '';
    if (Object.keys(req.body).length === 0) {
      res.send("<h1>No Batch Code entered!</h1>")
    }
    for (const [name,value] of Object.entries(formData)) {
        let production_date = decodeBATCHCode(value);
        let expiration_date = addThreeYears(production_date);
        tableRows += `
        <tr>
          <td>${value}</td>
          <td>${production_date.toLocaleDateString('en-GB')}</td>
          <td>${expiration_date.toLocaleDateString('en-GB')}</td>
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
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

