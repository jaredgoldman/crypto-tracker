const db = require('../index')
const ccxt = require('ccxt')

// 1- GET /api/users/:id === get users information
const getUsers = () => {
  const query = {
    text: 'SELECT * FROM users',
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

//2- GET /api/users/:id === get user information by id
const getUserById = (id) => {
  const query = {
    text: `SELECT * FROM users WHERE id = $1` ,
    values: [id]
  }

  return db
    .query(query)
    .then(result => result.rows[0])
    .catch((err) => err);
}

//3- GET /api/users/:id === get user information by id
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

// 4 - POST /api/users/new === register user 
const addUser = (email, password) => {
  const query = {
    text: `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
    values: [email, password]
  }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

// 5- GET /api/users/exchange/:id === get user exchange 
const getUserExchanges = (userId) => {
  const query = {
    text: `SELECT accounts.api_key, accounts.api_secret, exchanges.name as exchange_name
      FROM users
      INNER JOIN accounts
      ON users.id = accounts.user_id
      INNER JOIN exchanges
      ON accounts.exchange_id = exchanges.id
      WHERE users.id = $1`,
    values: [userId]
  }

  return db.query(query)
    .then(result => result.rows)
    .catch(err => err);
}

//6 - Get user exchanges but just the names 
const getUserExchangeNames = (userId) => {
  const query = {
    text: `SELECT exchanges.name as exchange_name
      FROM users
      INNER JOIN accounts
      ON users.id = accounts.user_id
      INNER JOIN exchanges
      ON accounts.exchange_id = exchanges.id
      WHERE users.id = $1`,
    values: [userId]
  }

  return db.query(query)
    .then(result => result.rows)
    .catch(err => err);
}

// - GET /api/users/exchanges
//   const getUserExchanges = (userId) => {
//     const query = {
//       text: `SELECT users.id, exchanges.name FROM exchanges 
//         INNER JOIN accounts
//         ON exchanges.id = accounts.exchange_id
//         INNER JOIN users
//         ON users.id = accounts.user_id
//         WHERE users.id = $1`,
//         values: [userId]
//     }
  
//   return db
//       .query(query)
//       .then(result => result.rows[0])
//       .catch((err) => err);
//}
  

//7- getUserTransactions
const getUserTransactions = (userId) => {
  const query = {
    text: `SELECT account_id, base_currency||'/'||quote_currency as asset, transaction_type, order_type, unit_price, amount, cost, transaction_fee
      FROM transactions
      INNER JOIN accounts
      ON transactions.account_id = accounts.id
      INNER JOIN users
      ON users.id = accounts.user_id
      WHERE user.id = $1`,
      values: [userId]
  }

  return db.query(query)
    .then(result => result.rows)
    .catch(err => err);
  }


// 8- getUserExchangeTransactions
const getUserExchangeTransactions = () => {
  const query = {
    text: `SELECT exchanges.name, account_id, base_currency||'/'||quote_currency as asset, transaction_type, order_type, unit_price, amount, cost, transaction_fee
      FROM transactions
      INNER JOIN accounts
      ON transactions.account_id = accounts.id
      INNER JOIN users
      ON users.id = accounts.user_id
      INNER JOIN exchanges
      ON accounts.exchange_id =exchanges.id`
  }
  return db.query(query)
    .then(result => result.rows)
    .catch(err => err);
}

//-9 
const getExchangeByName = (exchangeName) => {
  const query = {
    text: "SELECT * FROM exchanges WHERE name = $1",
    values: [exchangeName]
  }
  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

  
// 10- addUserTransaction
const addUserTransactions = (txnData) => {
  const {accountId, baseCurrency, quoteCurrency, 
    txnType, orderType, unitPrice, amount, cost, txnTime, txnFee} = txnData; 
    const query = {
      text: `INSERT INTO transactions (account_id, base_currency, quote_currency, 
      transaction_type, order_type, unit_price, amount, cost, transaction_time, 
      transaction_fee) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      values: [accountId, baseCurrency, quoteCurrency, 
      txnType, orderType, unitPrice, amount, cost, txnTime, txnFee]
    }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

 
// - POST /api/users/exchanges/new === add user exchange
// 11- Add new exchange
const addUserExchange = (exchangeName, exchangeWebsite) => {
  const query = {
    text: `INSERT INTO exchanges (name, website) VALUES ($1, $2) RETURNING *` ,
    values: [exchangeName, exchangeWebsite]
  }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

// 12- Add new user account
const addUserAccount = (txnData) => {
  const { userId, exchangeId, apiKey, apiSecret } = txnData;
    const query = {
      text: `INSERT INTO accounts (user_id, exchange_id, api_key, api_secret) VALUES ($1, $2, $3, $4) RETURNING *` ,
      values: [userId, exchangeId, apiKey, apiSecret]
    }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

// 13- Get exchanges 
const getExchanges = () => {
  const query = {
    text: `SELECT name 
      FROM exchanges`
  }

  return db.query(query)
    .then(result => result.rows)
    .catch(err => err);
}

 module.exports = {
  addUserExchange,
  getExchangeByName,
  getUsers,
  getUserById,
  getUserByEmail,
  addUser,
  getUserExchanges,
  getUserTransactions,
  getUserExchangeNames,
  getUserExchangeTransactions,
  addUserTransactions,
  addUserExchange, 
  addUserAccount,
  getExchanges
}
