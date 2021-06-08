const ccxt = require('ccxt');
const { 
  addUserTransaction
} = require('../db/queries/exchange-queries')

const getCcxtExchanges = () => {
  return ccxt.exchanges
}

const initializeExchange = (exchangeData) => {
  const { exchangeName, apiKey, secretKey } = exchangeData;
  const exchangeId = exchangeName;
  const exchangeClass = ccxt[exchangeId];
  const exchange = new exchangeClass({
    apiKey: apiKey,
    secret: secretKey,
    enableRateLimit: true
  });
  return exchange;
}

const fetchUserExchangeInfo = async (exchange) => {
  let resTrades = null;
  let resBalance = null;

  // grab balance
  try {
    resBalance = await exchange.fetchBalance();
  } catch(error) {
    console.log('error fetching balance')
    console.log(error)
  }

  // grab trades
  try {
    const exchangeTrades = await exchange.fetchMyTrades();
    resTrades = formatTrades(exchangeTrades);
  } catch(error) {
    console.log('error fetching balance')
    console.log(error)
  }
  
  return {
    resBalance, 
    resTrades
  }
}

const formatTrades = (trades) => {
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
      time: trade.datetime,
      orderType: trade.type,
      side: trade.side,
      fee: trade.fee.cost,
      feeCurrency: trade.fee.currency
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
  trades.forEach( async (trade) => {
    try {
      await addUserTransaction({accountId, ...trade});
    } catch(error) {
      console.log(error);
    }
  })
}

module.exports = { 
  getCcxtExchanges,
  initializeExchange,
  formatTrades,
  formatDbTrades,
  fetchUserExchangeInfo,
  addUserTransactions,
  addBalance,
  formatDbTrades
}