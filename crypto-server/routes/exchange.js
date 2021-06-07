const express = require('express');
const router = express.Router();
const ccxt = require('ccxt');
const { 
  initializeExchange, 
  fetchUserExchangeInfo 
} = require('../helpers/exchange-helpers');

const { 
  addUserAccount, 
  addExchange, 
  getExchangeByName, 
  addUserTransaction,
  getUserAccounts
} = require('../db/queries/exchange-queries')

router.get("/", (req, res) => {
  res.send(ccxt.exchanges);
})

router.post("/new", async (req, res) => {
  const exchangeData = req.body;

  // initiliaze exchange 
  const exchange = initializeExchange(exchangeData);

  let alert = null;
  let balance = null;
  let trades = null;

  // grab balance and trades for user
  try {
    const {resBalance, resTrades} = await fetchUserExchangeInfo(exchange)
    trades = resBalance;
    balance = resTrades;
  } catch(error) {
    console.log(error)
  }
  
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

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  const userBalances = {}
  const userTrades = {}
  const userAccounts = await getUserAccounts(userId);
  res.send(
    userAccounts
  )

  // const userExchanges = userAccounts.forEach( async (account) => {
  //   const exchangeData = {
  //     exchangeName: account.exchange_name,
  //     apiKey: account.api_key,
  //     secretKey: account.api_secret
  //   }
  //   const exchange = initializeExchange(exchangeData)
  //   const exchangeInfo = await fetchUserExchangeInfo(exchange);
  //   console.log(exchangeInfo)
  //   userBalances[account.exchange_name] = exchangeInfo.resBalance;
  //   userTrades[account.exchange_name] = exchangeInfo.resTrades;
  // })
  // res.send({
  //   userBalances,
  //   userTrades
  // })
})

module.exports = router;