require('dotenv').config();

const express = require('express');
const path = require('path');
const { connectDB, collection, collection2 } = require('./config/db');
const session = require('express-session');

// To ensure correct imports
console.log(connectDB, collection, collection2);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to Database
connectDB();

// Route to handle the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signIn.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signIn.html'));
});

app.get('/signUp.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signUp.html'));
});

app.get('/products.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// GET and POST methods

app.get('/public/signIn', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signIn.html'));
});

app.post('/public/signUp', async (req, res) => {

  try {

    const data = {
      name: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    const userData = await collection.insertMany([data]);
    console.log(userData);

    res.redirect('../signIn.html');

  } catch (error) {

    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/public/signIn', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in the database
    const user = await collection.findOne({ name: username });

    if (!user) {

      return res.status(404).send(` 
      <script>
        alert('User does not exist');
        window.location.href = '/signIn.html';
      </script>`)
      //return res.status(404).json({ message: 'Username does not exist' });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.redirect('../sellerAccountPage.html');
    //res.status(200).json({ message: 'Login Successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});
