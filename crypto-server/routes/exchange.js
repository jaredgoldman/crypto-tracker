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
        console.log(dbTransactions)
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
