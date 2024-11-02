/* eslint-disable array-callback-return */
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8246;

app.use(cors());
app.use(bodyParser.json());

const filePath = './public/assets/db.json';

function readData() {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get('/api/getData/:year/:month/', (req, res) => {
  const { year, month } = req.params;
  const data = readData();
  const yearData = data.find(item => Number(item.year) === Number(year));
  if (yearData) {
    const monthData = yearData.months.find(sub => Number(sub.id) === Number(month));
    if (monthData === undefined) {
      const newMonth = {
        id: parseInt(month, 10),
        expenses: []
      };
      yearData.months.push(newMonth);
      yearData.months.sort((a, b) => a.id - b.id);
      data.map((item) => {
        if (item.year === year) {
          item.months = yearData.months;
        }
      });
      res.json(newMonth);
    } else {
      res.json(monthData);
    }
  } else {
    res.json('');
  }
});

app.post('/api/saveData', (req, res) => {
  const newData = req.body;
  const data = readData();
  data.push(newData);
  writeData(data);
  res.json({ message: 'Data added successfully!' });
});

app.put('/api/updateData/:year/:month/:id', (req, res) => {
  const year = parseInt(req.params.year);
  const updatedObject = req.body;
  let data = readData();

  data = data.map(item => (item.year === year ? { ...item, ...updatedObject } : item));

  writeData(data);
  res.json({ message: 'Data updated successfully!' });
});

app.delete('/api/deleteData/:year/:month/:id', (req, res) => {
  const year = parseInt(req.params.year);
  let data = readData();

  data = data.filter(item => item.year !== year);

  writeData(data);
  res.json({ message: 'Data deleted successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
