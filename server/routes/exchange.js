const express = require('express');
const router = express.Router();

const {  
  fetchUserExchangeTrades, 
  getCcxtExchanges,
  addUserTransactions,
  formatDbTrades,
  addAccountToDb,
  initializeExchange,
  addBalanceToDb
} = require('../helpers/exchange-helpers');

const {
  getUserTransactions,
  getUserAccounts,
  getAccountByApiKey,
  disableUserAccount,
  enableUserAccount,
  fetchUserBalances
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

  let account 
  let trades
  let balance
  let errorMessage
  const exchange = initializeExchange(exchangeData); 

  // add account to database
  try {
    // check if account exists by comparing api key
    account = await getAccountByApiKey(exchangeData)
    // if account exists 
    if (account) {
      if (!account.active) {
       await enableUserAccount(account.user_id, account.id);
       console.log('enabled previously disabled account');
      } else {
        errorMessage = "account already active"
        return res.send({account, errorMessage})
      }
    }
    account = await addAccountToDb(exchangeData)
    console.log("account added to db");
    trades = await fetchUserExchangeTrades(exchange);
    console.log("trades fetched from exchange");
    await addUserTransactions(account.id, trades);
    console.log('transactions added to db');
    balance = await exchange.fetchBalance();
    console.log("adding balance");
    await addBalanceToDb(balance, exchangeData.userId);
    console.log('balance added');
  } catch(error) {
    console.log(error);
  }
  console.log(account);
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

router.get('/balance/:userId', async (req, res) => {
  const { userId } = req.params;
  let balances;

  try {
    balances = await fetchUserBalances(userId);
    console.log(balances);  
  } catch(error) {

  }
  res.send(balances)
})

module.exports = router;
