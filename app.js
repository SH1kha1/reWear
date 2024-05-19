require('dotenv').config();

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = 3000;

// Connect passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/auth'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to Database
connectDB();

// Route to handle the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
