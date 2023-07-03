const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Dummy database to store user information
const users = [
  { id: 1, username: 'User123', password: 'password1' },
  { id: 2, username: 'User1234', password: 'password2' },
  { id: 3, username: 'User12345', password: 'password3' }
];

// Function to validate the username
function validateUsername(username) {
  const alphanumeric = /^[a-zA-Z0-9]+$/;
  return username.length >= 6 && username.length <= 12 && alphanumeric.test(username);
}

// Function to validate the password
function validatePassword(password) {
  return password.length >= 6;
}

// Login route



app.post('/login', (req, res) => {  
  const { username, password } = req.body;

  if (validateUsername(username) && validatePassword(password)) {
    // Check if user exists in the dummy database
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      // User is authenticated
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials!' });
    }
  } else {
    res.status(400).json({ message: 'Invalid username or password!' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
