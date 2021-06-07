const ccxt = require('ccxt');

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

module.exports = { 
  initializeExchange,
  formatTrades,
  fetchUserExchangeInfo
}