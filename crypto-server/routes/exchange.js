const express = require('express');
const router = express.Router();

const {  
  fetchUserExchangeTrades, 
  getCcxtExchanges,
  addUserTransactions,
  // addBalance,
  formatDbTrades,
  addAccountToDb,
  initializeExchange
} = require('../helpers/exchange-helpers');

const {
  getUserTransactions,
  getUserAccounts
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

module.exports = router;

//   // grab balance and trades for user
//   try {
//     const {resBalance, resTrades} = await fetchUserExchangeTrades(exchange);
//     trades = resTrades;
//     balance = resBalance;
//   } catch(error) {
//     console.log('error fetching user exchange info')
//     return res.send({alert: 'error fetching user exchange info'})
//   }


  
//   // store transactions in db
//   try {
//     const addedTransactions = await addUserTransactions(account.id, trades);
//   } catch(error) {
//     console.log('error adding transactions to db')
//     return res.send({alert: 'error adding transactions to db'});
//   }
//   return res.send({balance, trades});


// initialize account code
  // let dbExchange = null;
  // try {
  //   dbExchange = await getExchangeByName(exchangeData.exchangeName); 
  //   if (!dbExchange) {
  //     dbExchange = await addExchange(exchangeData.exchangeName);
  //   }
  // } catch(error) {
  //   console.log('error adding exchange')
  //   return res.send({alert: 'error adding exchange'});
  // }

  // let account = null;
  // try {
  //   account = await addUserAccount({exchangeId: dbExchange.id, ...exchangeData});
  // } catch(error) {
  //   console.log('error adding account to db')
  //   return res.send({alert: 'error adding account to db'});
  // }