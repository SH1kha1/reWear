require('dotenv').config();

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const session = require('express-session');
const { collection } = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to Database
connectDB();

app.get('/public/signInUp', (req, res) => {
  res.render('signInUp');
})

app.post('/public/signInUp', async (req, res) => {

  const data = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  const userData = await collection.insertMany(data);
  console.log(userData);
})

// Route to handle the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
