const db = require('../index')

// USER HELPERS //

const getUserByEmail = (email) => {
  const query = {
    text: `SELECT * FROM users WHERE email = $1` ,
    values: [email]
  }

  return db
    .query(query)
    .then(result => result.rows[0])
    .catch((err) => err);
}


const addUser = (firstName, lastName, email, password) => {
  const query = {
    text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
    values: [firstName, lastName, email, password]
  }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

 module.exports = {
  getUserByEmail,
  addUser
}
