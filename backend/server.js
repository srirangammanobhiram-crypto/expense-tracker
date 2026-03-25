const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "data.json";

// read data
function readData() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

// save data
function saveData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data));
}

// get all expenses
app.get("/expenses", (req, res) => {
  res.json(readData());
});

// add expense
app.post("/expenses", (req, res) => {
  let data = readData();

  const expense = {
    id: Date.now(),
    ...req.body
  };

  data.push(expense);

  saveData(data);

  res.json(expense);
});

// delete expense
app.delete("/expenses/:id", (req, res) => {
  let data = readData();

  data = data.filter(e => e.id != req.params.id);

  saveData(data);

  res.json({ success: true });
});

app.listen(5000, () =>
  console.log("Server running on port 5000")
);