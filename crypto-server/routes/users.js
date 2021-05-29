var express = require('express');
var router = express.Router();
const {getUserByEmail, addUser} = require('../db/helpers/dbHelpers');

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
});

  // USER REGISTER
router.post('/register', (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(409).send("Please enter a valid email and password")
  }
  getUserByEmail(email)
  .then(user => {
    if (user) {
      return res.status(409).send("Sorry, there is already a user registered with this email")
    }
    addUser(email, password).then(user => {
      return res.status(200).send(user.id);
    })
  })
});

module.exports = router;
