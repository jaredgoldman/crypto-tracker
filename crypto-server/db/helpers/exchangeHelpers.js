const db = require('../index');

const addUserTransaction = (txnData) => {
  const {accountId, baseCurrency, quoteCurrency, 
    orderType, unitPrice, amount, cost, time, txnFee} = txnData; 
    const query = {
      text: `INSERT INTO transactions (user_id, base_currency, quote_currency, 
      transaction_type, order_type, unit_price, amount, cost, transaction_time, 
      transaction_fee) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      values: [accountId, baseCurrency, quoteCurrency, 
      txnType, orderType, unitPrice, amount, cost, txnTime, txnFee]
    }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

// { baseCurrency: 'XRP',
//     quoteCurrency: 'XRP',
//     coinSymbol: 'XRP/USD',
//     price: 0.59846,
//     amount: 0.00005232,
//     cost: 0.0000313114272,
//     time: 1613332087026,
//     orderType: 'limit',
//     side: 'buy' },


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
      values: [accountName, userId, exchangeId, accountName, apiKey, apiSecret]
    }

  return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err);
}

module.exports = {
  addUserAccount,
  addExchange,
  getExchangeByName,
  addUserTransaction
}