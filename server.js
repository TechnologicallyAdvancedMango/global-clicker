require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const clickerRoutes = require('./routes/clicker');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/click', clickerRoutes);

let clicks = 0;
try {
  clicks = parseInt(fs.readFileSync('clicks.txt', 'utf8')) || 0;
} catch (e) {}

app.get('/clicks', (req, res) => res.json({ clicks }));

app.post('/click', (req, res) => {
  clicks++;
  fs.writeFileSync('clicks.txt', clicks.toString());
  res.json({ clicks });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
