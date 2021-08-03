const ccxt = require('ccxt');
const { 
  addUserTransaction,
  getExchangeByName,
  addUserAccount,
  fetchUserBalance,
  updateUserBalance,
  addUserBalance
} = require('../db/queries/exchange-queries')

const { 
  getCoinByName,
  addCoin
 } = require('../db/queries/coin-queries')
const getCcxtExchanges = () => {
  return ccxt.exchanges
}

// account helpers
const initializeExchange = (exchangeData) => {
  const { exchangeName, apiKey, secretKey, sandboxMode } = exchangeData;
  const exchangeId = exchangeName;
  const exchangeClass = ccxt[exchangeId];
  const exchange = new exchangeClass({
    apiKey: apiKey,
    secret: secretKey,
    enableRateLimit: true,  
  });
  exchange.setSandboxMode(sandboxMode)
  return exchange;
}

  // check if exchange is in db 
  // if not, store exchange info in db
const addAccountToDb = async (exchangeData) => {
  let dbExchange

  try {
    dbExchange = await getExchangeByName(exchangeData.exchangeName); 
    if (!dbExchange) {
      dbExchange = await addExchange(exchangeData.exchangeName);
    }
  } catch(error) {
    console.log('error adding exchange')
    console.log(error)
    return 'error adding exchange'
  }

  let account

  try {
    account = await addUserAccount({...exchangeData, exchangeId: dbExchange.id, active: true })
  } catch(error) {
    console.log('error adding account to db')
    return 'error adding account to db'
  }
  return account;
}

// trade helpers
const fetchUserExchangeTrades = async (exchange) => {
  let resTrades = null;

  // grab trades
  let exchangeTrades = null;

  try {
    if (exchange.name === 'Kraken') {
      exchangeTrades = await exchange.fetchMyTrades();
    } else {
      exchangeTrades = await fetchIterativeTrades(exchange)
    }
    resTrades = formatTrades(exchangeTrades, exchange.name);
  } catch(error) {
    console.log('error fetching balance');
    console.log(error);
  }
  
  return resTrades
}

const addUserTransactions = async (accountId, trades) => {
  trades.forEach( async trade => {
    try {
      await addUserTransaction({accountId, ...trade});
      return 'transactions added'
    } catch(error) {
      console.log(error);
    }
  })
}

const fetchIterativeTrades = async (exchange) => {
  let tradeArray = [];
  const markets = await exchange.fetchMarkets();

  for (let market of markets) {
    const trades = await exchange.fetchMyTrades(market.symbol)
    if (trades != false) {
      tradeArray = [...trades, ...tradeArray]
    }
  }

  return tradeArray;
}

const formatTrades = (trades, exchangeName) => {
  const formattedTrades = []
  trades.forEach(trade => {
    const baseCurrency = trade.symbol.split('/')[0];
    const quoteCurrency = trade.symbol.split('/')[1];
    formattedTrades.push({
      transactionId: trade.id,
      baseCurrency,
      quoteCurrency,
      coinSymbol: trade.symbol,
      unitPrice: trade.price,
      amount: trade.amount,
      cost: trade.cost,
      exchangeName,
      time: trade.datetime,
      orderType: trade.type,
      side: trade.side,
      fee: trade.fee.cost,
      feeCurrency: trade.fee.currency,
    })
  })
  return formattedTrades;
}

const formatDbTrades = (trades) => {
  const formattedTrades = []
  trades.forEach(trade => {
    formattedTrades.push({
      transactionId: trade.transaction_id,
      baseCurrency: trade.base_currency,
      quoteCurrency: trade.quote_currency,
      coinSymbol: trade.coin_symbol,
      unitPrice: trade.unit_price,
      amount: trade.amount,
      cost: trade.cost,
      exchangeName: trade.exchange_name,
      time: trade.transaction_time,
      orderType: trade.order_type,
      side: trade.side,
      fee: trade.transaction_fee,
      feeCurrency: trade.feeCurrency
    })
  })
  return formattedTrades;
}

// balance helpers
const addBalanceToDb = (balance, userId) => {
  const balances = balance.total;

  Object.keys(balances).forEach(async (coin) => {
    let dbCoin;
    // if we have a positive balance
    // if the coin is not already stored in the db add coin and use that reference 
    try {
      if (balances[coin]) {
        dbCoin = await getCoinByName(coin);
        if (!dbCoin) {
          dbCoin = await addCoin(coin);
        }
      }
      // update user balance with the symbol, user id and either our old or newly added coin
      // if there is no current balance object, create one
      if (dbCoin) {
        const dbBalance = await fetchUserBalance(userId, dbCoin.id);
        if (dbBalance.length) {
          await updateUserBalance(balances[coin], userId, dbCoin.id);
        } else {
          await addUserBalance(userId, dbCoin.id, balances[coin]);
        }
      } 
    } catch(error) {
      console.log(error);
    }
  })
}

module.exports = { 
  getCcxtExchanges,
  initializeExchange,
  addAccountToDb,
  formatTrades,
  formatDbTrades,
  fetchUserExchangeTrades,
  addUserTransactions,
  formatDbTrades,
  addBalanceToDb,
}