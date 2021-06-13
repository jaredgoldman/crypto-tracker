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

const deleteUserCoin = (userId, coinId) => {
  const query = {
    text: `DELETE FROM user_coins
    WHERE coin_id IN
        (
          SELECT coin_id FROM user_coins 
          JOIN users ON user_id = users.id
          WHERE user_id = $1 AND coin_id = $2
          LIMIT 1
        )`,
    values: [userId, coinId]
  }

  return db
  .query(query)
  .then(res => res.rowCount === 1)
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

const getUserTransactionsByCoin = (userId, coinId) => {
  const query = {
    text: `SELECT account_id, 
      transaction_id, 
      exchanges.name as exchange_name, 
      coin_symbol, 
      base_currency, 
      quote_currency, 
      side, 
      order_type, 
      unit_price, 
      amount, 
      transaction_time,
      cost, 
      transaction_fee
    FROM transactions
    INNER JOIN accounts
    ON transactions.account_id = accounts.id
    INNER JOIN users
    ON users.id = accounts.user_id
    INNER JOIN exchanges
    ON accounts.exchange_id = exchanges.id
    INNER JOIN coins
    ON transactions.base_currency = coins.symbol 
    WHERE users.id = $1 AND coins.symbol = $2`,
    values: [userId, coinId]
    }

  return db.query(query)
    .then(result => result.rows)
    .catch(err => err);
}


module.exports = { getCoinByName, addCoin, addUserCoin, deleteUserCoin, getUserCoins, getUserCoin, getUserTransactionsByCoin }
