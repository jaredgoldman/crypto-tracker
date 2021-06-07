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

// { baseCurrency: 'XRP',
// quoteCurrency: 'CAD',
// coinSymbol: 'XRP/CAD',
// unitPrice: 0.62565,
// amount: 4434.70973614,
// cost: 2774.576146415991,
// time: 1613510368587,
// orderType: 'market',
// side: 'sell',
// fee: 7.21389799,
// feeCurrency: 'CAD' },


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

module.exports = {
  addUserAccount,
  addExchange,
  getExchangeByName,
  addUserTransaction
}