const ccxt = require('ccxt')

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
}