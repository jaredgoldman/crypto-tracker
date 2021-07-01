const express = require('express');
const router = express.Router();

const {  
  fetchUserExchangeTrades, 
  getCcxtExchanges,
  addUserTransactions,
  formatDbTrades,
  addAccountToDb,
  initializeExchange
} = require('../helpers/exchange-helpers');

const {
  getUserTransactions,
  getUserAccounts,
} = require('../db/queries/exchange-queries')

      // EXCHANGE ROUTES //

// get all exchanges currently on ccxt
router.get("/", (req, res) => {
  const ccxtExchanges = getCcxtExchanges()
  res.send(ccxtExchanges);
})

// add new exchange
router.post("/new", async (req, res) => {
  const exchangeData = req.body;

  let account = null;
  let trades = null;
  let dbTransactions = null;

  // add account to database
  try {
    account = await addAccountToDb(exchangeData)
  } catch(error) {
    // res.send({alert: 'error adding account to db'})
    console.log(error)
  }

  // initialize ccxt exchange
  const exchange = initializeExchange(exchangeData);  

  // fetch trades and balance from exchange 
  try {
    trades = await fetchUserExchangeTrades(exchange);
  } catch(error) {
    // res.send({alert: `error fetching user info from exchange`})
    console.log(error)
  }

  // add user transactions to database
  try {
    await addUserTransactions(account.id, trades);
  } catch(error) {
    // res.send({alert: 'error adding transactions'})
    console.log(error)
  }

  // ADD USER BALANCE HERE

  try {
     dbTransactions = await getUserTransactions(exchangeData.userId);
   } catch(error) {
    //  res.send({alert: 'error retreiving trades from database'})
    console.log(error)
   } 

   const transactions = formatDbTrades(dbTransactions);
   res.send({transactions});
})

// get all user exchange info stored in db
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const userAccounts = await getUserAccounts(userId);
    let balance = {}
  
    userAccounts.forEach( async (account) => {
  
      try {
        // grab all transactions from db 
        const dbTransactions = await getUserTransactions(userId);
        // format transactions
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

// get all user trades 
router.get('/trades/:userId', async (req, res) => {
  const { userId } = req.params;
  let allTrades = null;

  try {
    allTrades = await getUserTransactions(userId);
  } catch(error) {
    console.log(error.response.data);
  }
  const formattedTrades = formatDbTrades(allTrades)
  res.send(formattedTrades)
})

module.exports = router;
