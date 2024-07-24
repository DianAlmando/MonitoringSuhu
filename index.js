const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files from "public" directory

// In-memory storage for temperature data
let temperatures = [];

// Endpoint to receive temperature data
app.post('/repl-temperature', (req, res) => {
  const { temperature } = req.body;
  if (temperature !== undefined) {
    const timestamp = new Date();
    temperatures.push({ id: temperatures.length + 1, value: temperature, timestamp });
    console.log(`Received temperature: ${temperature} at ${timestamp}`);
    res.send('Temperature received');
  } else {
    res.status(400).send('Temperature not provided');
  }
});

// Endpoint to get temperature data
app.get('/temperature', (req, res) => {
  res.json({
    temperatures: temperatures.map(t => t.value),
    timestamps: temperatures.map(t => t.timestamp),
    ids: temperatures.map(t => t.id)
  });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
