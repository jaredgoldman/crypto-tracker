const express = require('express');
const router = express.Router();

const { 
  initializeExchange, 
  fetchUserExchangeInfo, 
  getCcxtExchanges,
  addUserTransactions,
  addBalance,
  formatDbTrades
} = require('../helpers/exchange-helpers');

const { 
  addUserAccount, 
  addExchange, 
  getExchangeByName, 
  getUserTransactions,
  getUserAccounts
} = require('../db/queries/exchange-queries')

router.get("/", (req, res) => {
  const ccxtExchanges = getCcxtExchanges()
  res.send(ccxtExchanges);
})

router.post("/new", async (req, res) => {
  const exchangeData = req.body;

  if (!exchangeData.exchangeName || !exchangeData.apiKey || !exchangeData.secretKey) {
    return res.send({alert: `please enter valid credentials`})
  }

  // initiliaze exchange 
  const exchange = initializeExchange(exchangeData);
  
  console.log('new exchange entered');

  let balance = null;
  let trades = null;

  // grab balance and trades for user
  try {
    const {resBalance, resTrades} = await fetchUserExchangeInfo(exchange);
    trades = resTrades;
    balance = resBalance;
  } catch(error) {
    console.log('error fetching user exchange info')
    return res.send({alert: 'error fetching user exchange info'})
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
    console.log('error adding exchange')
    return res.send({alert: 'error adding exchange'});
  }
  
  // store user account in db 
  let account = null;
  try {
    account = await addUserAccount({exchangeId: dbExchange.id, ...exchangeData});
  } catch(error) {
    console.log('error adding account to db')
    return res.send({alert: 'error adding account to db'});
  }
  
  // store transactions in db
  try {
    const addedTransactions = await addUserTransactions(account.id, trades);
  } catch(error) {
    console.log('error adding transactions to db')
    return res.send({alert: 'error adding transactions to db'});
  }
  return res.send({balance, trades});
})

// gets all user exchange info 
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userAccounts = await getUserAccounts(userId);
    let balance = {}
  
    userAccounts.forEach( async (account) => {
      const accountId = account.id;
      const exchangeData = {
        exchangeName: account.exchange_name,
        apiKey: account.api_key,
        secretKey: account.api_secret
      }

      // initialize each exchange
      const exchange = initializeExchange(exchangeData);
      // fetch trades and balance from exchange
      const {resBalance, resTrades} = await fetchUserExchangeInfo(exchange);
      // add transactions to db
      await addUserTransactions(accountId, resTrades);
      // add exchange balance to userBalance 
      balance = addBalance(resBalance.total);
  
      try {
        // grab all transactions from db 
        const dbTransactions = await getUserTransactions(userId);
        const transactions = formatDbTrades(dbTransactions);
        // send back transactions and userbalance 
        res.send({balance, transactions});
      } catch(error) {
        console.log(error);
      } 
         
    })
  } catch(error) {
    console.log(error);
  }

})

module.exports = router;
