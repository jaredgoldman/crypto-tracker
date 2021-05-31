const db = require('../index');

const getCoinByName = (coinSymbol) => {
  const query = {
    text: `SELECT * FROM coins WHERE symbol = $1`,
    values: [coinSymbol]
  }

  return db
  .query(query)
  .then(result => result.rows[0])
  .catch((err) => err);
}

const addCoin = (coinSymbol) => {
  const query = {
    text: `INSERT INTO coins (symbol) VALUES ($1) RETURNING *`,
    values: [coinSymbol]
  }

  return db
  .query(query)
  .then(result => result.rows[0])
  .catch((err) => err);
}

const addUserCoin = (userId, coinId) => {
  const query = {
    text: `INSERT INTO user_coins (user_id, coin_id) 
    VALUES ($1, $2) RETURNING *`,
    values: [userId, coinId]
  }

  return db
  .query(query)
  .then(result => result.rows[0])
  .catch((err) => err);
}

const getUserCoins = (userId) => {
  const query = {
    text: `SELECT symbol FROM user_coins 
           JOIN users ON user_id = users.id
           JOIN coins ON coin_id = coins.id
           WHERE user_id = $1`,
    values: [userId]
  }

  return db
  .query(query)
  .then(result => result.rows)
  .catch((err) => err);
}

const getUserCoin = (userId, coinId) => {
  const query = {
    text: `SELECT * FROM user_coins 
           WHERE user_id = $1 AND coin_id = $2`,
    values: [userId, coinId]
  }

  return db
  .query(query)
  .then(result => result.rows[0])
  .catch((err) => err);
}

module.exports = { getCoinByName, addCoin, addUserCoin, getUserCoins, getUserCoin }