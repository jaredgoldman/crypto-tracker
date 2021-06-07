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

// { id: 'TD4LDL-FOKMJ-ZT5TKA',
// order: 'OZ7YYC-UINVM-C2C2WZ',
// info:
//  { ordertxid: 'OZ7YYC-UINVM-C2C2WZ',
//    postxid: 'TKH2SE-M7IF5-CFI7LT',
//    pair: 'KSMUSD',
//    time: '1621215665.7504',
//    type: 'buy',
//    ordertype: 'limit',
//    price: '517.00000',
//    cost: '53.92310',
//    fee: '0.08628',
//    vol: '0.10430000',
//    margin: '0.00000',
//    misc: '',
//    id: 'TD4LDL-FOKMJ-ZT5TKA' },
// timestamp: 1621215665750,
// datetime: '2021-05-17T01:41:05.750Z',
// symbol: 'KSM/USD',
// type: 'limit',
// side: 'buy',
// takerOrMaker: undefined,
// price: 517,
// amount: 0.1043,
// cost: 53.9231,
// fee: { cost: 0.08628, currency: 'USD' } },

module.exports = { 
  initializeExchange,
  formatTrades,
}