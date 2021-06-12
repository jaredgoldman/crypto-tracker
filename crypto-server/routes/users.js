const express = require('express');
const router = express.Router();
const {
  getUserByEmail, 
  addUser
} = require('../db/queries/user-queries');

 // USER LOGIN
 router.post('/login', (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(409).send("Please enter a valid email and password")
  }
  getUserByEmail(email)
  .then(user => {
    if (!user) {
      return res.status(401).send("Error: invalid email");
    }
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
router.post('/register', async (req, res) => {
  const {firstName, lastName, email, password} = req.body;
  let user = null;

  try {
    user = await getUserByEmail(email);
    if (user) {
      return res.send("Sorry, there is already a user registered with this email")
    }
  } catch(error) {
    res.send({alert: 'db error'})
  }

  try {
    await addUser(firstName, lastName, email, password)
  } catch(error) {
    res.send({alert: 'error adding user'})
  }

  return res.send(user.id);
});

module.exports = router;
