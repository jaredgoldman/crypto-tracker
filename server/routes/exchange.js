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
  disableUserAccount
} = require('../db/queries/exchange-queries')

      // EXCHANGE ROUTES //

// get all exchanges currently on ccxt
router.get("/", (req, res) => {
  const ccxtExchanges = getCcxtExchanges()
  res.send(ccxtExchanges);
})

// add new exchange account
router.post("/new", async (req, res) => {
  const exchangeData = req.body;

  let account = null;
  let trades = null;
  let errorMessage

  // add account to database
  try {
    account = await addAccountToDb(exchangeData)
  } catch(error) {
    // res.send({alert: 'error adding account to db'})
    errorMessage = error;
  }

  // initialize ccxt exchange
  const exchange = initializeExchange(exchangeData);  

  // fetch trades and balance from exchange and store in db
  try {
    trades = await fetchUserExchangeTrades(exchange);
    await addUserTransactions(account.id, trades);
  } catch(error) {
    // res.send({alert: `error fetching user info from exchange`})
    errorMessage = error;
  }

  // ADD USER BALANCE HERE

   res.send({account, errorMessage});
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

// send all users connected exchange accounts to front end
router.get('/user/exchanges/:userId', async (req, res) => {
  const { userId } = req.params;

  let userAccounts

  try {
    userAccounts = await getUserAccounts(userId);
  } catch(error) {
    console.log(error)
  }
  console.log(userAccounts)
  const exchangeAccounts = userAccounts.map(account => {
    return {
      accountId: account.id,
      accountName: account.account_name,
      exchangeName: account.exchange_name,
      active: account.active
    }
  })

  res.send(exchangeAccounts)
})

// disable account
router.post('/user/exchanges', async (req, res) => {
  const { userId, accountId } = req.body
  let disabled
  try {
    disabled = await disableUserAccount(userId, accountId)
    res.send({deleted: true})
  } catch(error) {
    console.log(error)
    res.send({errorMessage: error})
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
