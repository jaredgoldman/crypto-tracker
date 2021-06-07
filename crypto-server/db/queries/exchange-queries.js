const db = require('../index');

const addUserTransaction = (txnData) => {
  const {accountId, baseCurrency, quoteCurrency, 
    orderType, unitPrice, amount, cost, time, fee, feeCurrency} = txnData; 
    const query = {
      text: `INSERT INTO transactions (account_id, base_currency, quote_currency, 
      transaction_type, order_type, unit_price, amount, cost, transaction_time, 
      transaction_fee, fee_currency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      values: [accountId, baseCurrency, quoteCurrency, 
      orderType, orderType, unitPrice, amount, cost, time, fee, feeCurrency]
    }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

const addExchange = (exchangeName, exchangeWebsite) => {
  const query = {
    text: `INSERT INTO exchanges (name) VALUES ($1) RETURNING *` ,
    values: [exchangeName, exchangeWebsite]
  }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

const getExchangeByName = (exchangeName) => {
  const query = {
    text: "SELECT * FROM exchanges WHERE name = $1",
    values: [exchangeName]
  }
  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

// exchangeName,
// accountName,
// apiKey,
// secretKey

const addUserAccount = (exchangeData) => {
  const { accountName, userId, exchangeId, apiKey, apiSecret } = exchangeData;
    const query = {
      text: `INSERT INTO accounts (account_name, user_id, exchange_id, api_key, api_secret) VALUES ($1, $2, $3, $4, $5) RETURNING *` ,
      values: [accountName, userId, exchangeId, apiKey, apiSecret]
    }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

const getUserAccounts = (userId) => {
  const query = {

    text: `SELECT accounts.account_name, accounts.api_key, accounts.api_secret, exchanges.name as exchange_name
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

module.exports = {
  addUserAccount,
  getUserAccounts,
  addExchange,
  getExchangeByName,
  addUserTransaction
}