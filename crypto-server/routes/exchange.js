const express = require('express');
const router = express.Router();
const ccxt = require('ccxt');
const { initializeExchange, formatTrades } = require('../helpers/exchange-helpers');
const { addUserAccount, addExchange, getExchangeByName, addUserTransaction } = require('../db/helpers/exchangeHelpers')

router.get("/", (req, res) => {
  res.send(ccxt.exchanges);
})

// exchangeName,
// accountName,
// apiKey,
// secretKey

router.post("/new", async (req, res) => {
  const exchangeData = req.body;

  // initiliaze exchange 
  const exchange = initializeExchange(exchangeData);

  let alert = null;

  // grab balance and trades for user
  const {balance, trades} = await fetchUserExchangeInfo(exchange)
  
  // check if exchange is in db 
  // if not, store exchange info in db
  let dbExchange = null;
  try {
    dbExchange = await getExchangeByName(exchangeData.exchangeName); // if no
    if (!exchange) {
      dbExchange = await addExchange(exchangeData.exchangeName);
    }
  } catch(error) {
    console.log('error adding exchange');
    console.log(error);
  }
  
  // store user account in db 
  let account = null;
  try {
    account = await addUserAccount({exchangeId: dbExchange.id, ...exchangeData});
  } catch(error) {
    console.log('error storing user account in db');
    console.log(error);
  }
  
  // store transactions in db
  try {
    for (let trade of trades) {
      const addedTransactions = await addUserTransaction({accountId: account.id, ...trade});
      console.log(addedTransactions)
    }
  } catch(error) {
    console.log(error);
  }
 
  res.send({balance, trades});
})

// HELPERS //

const fetchUserExchangeInfo = async (exchange) => {
  let trades = null;
  let balance = null;

  // grab balance
  try {
    balance = await exchange.fetchBalance();
  } catch(error) {
    console.log('error fetching balance')
    console.log(error)
  }

  // grab trades
  try {
    const exchangeTrades = await exchange.fetchMyTrades();
    trades = formatTrades(exchangeTrades);
  } catch(error) {
    console.log('error fetching balance')
    console.log(error)
  }
  
  return {
    balance, 
    trades
  }
}

module.exports = router;