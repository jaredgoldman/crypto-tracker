const ccxt = require('ccxt');
const { 
  addUserTransaction,
  getExchangeByName,
  addUserAccount
} = require('../db/queries/exchange-queries')

const getCcxtExchanges = () => {
  return ccxt.exchanges
}

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
  let dbExchange = null;
  try {
    dbExchange = await getExchangeByName(exchangeData.exchangeName); 
    if (!dbExchange) {
      dbExchange = await addExchange(exchangeData.exchangeName);
    }
    console.log('exchange added')
  } catch(error) {
    console.log('error adding exchange')
    console.log(error)
    return 'error adding exchange'
  }

  let account = null;
  try {
    account = await addUserAccount({exchangeId: dbExchange.id, ...exchangeData})
    console.log('user account added')
  } catch(error) {
    console.log('error adding account to db')
    return 'error adding account to db'
  }
  return account;
}

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
    console.log('error fetching balance')
    console.log(error)
  }
  
  return resTrades
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

const addBalance = (balances) => {
  let userBalance = {}
  for (let balance in balances) {
    if (!userBalance[balance]) {
      userBalance[balance] = balances[balance];
    } else {
      userBalance[balance] += balances[balance];
    }
  }
  return userBalance;
}

const addUserTransactions = async (accountId, trades) => {
  console.log(trades)
  trades.forEach( async trade => {
    try {
      const addedTransaction = await addUserTransaction({accountId, ...trade});
      return 'transactions added '
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
  addBalance,
  formatDbTrades
}