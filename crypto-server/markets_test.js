const ccxt = require('ccxt')

const exchangeData = {
  apiKey: 'd836caeb-8f2b-4a1a-ba11-612d76cb85cb',
  secretKey: 'kh5FGZPVc6RShourX_1jp_YPKcBBIUbsyuo4togtxWAwYmFmNGUyNy1kOGUzLTQ5YTQtOTVlOS1jMjhlMDFiZGMwYTY',
  exchangeName: 'phemex',
  sandboxMode: true
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

const exchange = initializeExchange(exchangeData);

// exchange.fetchCurrencies().then(currencies => {
//   console.log(Object.keys(currencies))
// })

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

fetchIterativeTrades(exchange).then(tradeArray => {
  console.log(tradeArray)
})