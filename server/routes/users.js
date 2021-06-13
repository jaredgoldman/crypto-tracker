const express = require('express');
const router = express.Router();
const {
  getUserByEmail, 
  addUser
} = require('../db/queries/user-queries');

 // USER LOGIN
 router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  user = null;

  try {
    user = await getUserByEmail(email)
    if (!user) {
      return res.send({alert: 'invalid user credentials'});
    }
  } catch(error) {
    res.send({alert: 'error getting user from db'})
  }
  
  if (email && user.password === password) {
    return res.send({user_id: user.id});
  } 
  return res.send({alert: 'invalid user credentials'})
 
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
