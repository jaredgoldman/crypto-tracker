const express = require('express');
const router = express.Router();
const {getUserByEmail, addUser} = require('../db/helpers/userHelpers');

 // USER LOGIN
 router.post('/login', (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(409).send("Please enter a valid email and password")
  }
  getUserByEmail(email)
  .then(user => {
    if (email && user.password === password) {
      return res.status(200).json(user.id);
    } 
    return res.status(401).send("Error: Invalid credentials");
  })
  .catch(err => {
    console.log(err)
  })
});

  // USER REGISTER
router.post('/register', (req, res) => {
  const {firstName, lastName, email, password} = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(409).send("Please enter a valid email and password")
  }
  getUserByEmail(email)
  .then(user => {
    if (user) {
      return res.status(409).send("Sorry, there is already a user registered with this email")
    }
    addUser(firstName, lastName, email, password).then(user => {
      return res.status(200).send(user.id);
    })
  })
  .catch(err => {
    console.log(err)
  })
});

module.exports = router;
