const sendTime = (timeString) => {
  switch(timeString) {
   case '1m':
     return new Date - 60000
    case '5m':
     return new Date - 300000 
    case '30m':
     return new Date - 1800000 
    case '1hr':
     return new Date - 3600000 
    case '4hr':
     return new Date - 14400000 
    case '1d':
     return new Date - 345600000 
    case '1w':
     return new Date - 604800000 
    case '2w':
     return new Date - 1209600000 
    case '1mo':
     return new Date - 2629800000 
    case '6mo':
     return new Date - 15778800000 
    default:
     return new Date() 
  }
} 

const oneMonthAgo = () => new Date - 2629800000
const oneWeekAgo = () => new Date - 604800000
const oneDayAgo = () => new Date - 86400000
const oneMinuteAgo = () => new Date - 60000

const getExchangeInfo = (exchangeData, exchangeSelection, coin, timeframe) => {
  const firstExchange = exchangeData[0];
  const {api_key, api_secret} = firstExchange; 
  const exchangeId = exchangeSelection;
  const exchangeClass = ccxt[exchangeId];
  const exchange = new exchangeClass({
    apiKey: api_key,
    secret: api_secret,
    enableRateLimit: true
  });
  const fetchTrades = exchange.fetchMyTrades();
  const fetchOHLCV = exchange.fetchOHLCV(coin, timeframe, oneMonthAgo());
  const fetchTicker = exchange.fetchTicker(coin);
  const fetchBalance = exchange.fetchBalance();
  const fetchCoins = exchange.fetchTickers(["BTC/CAD", "DOGE/USD", "ETH/USD", "ALGO/USD", "XRP/USD"]);
  const timeframes = exchange.timeframes;
  return Promise.all([fetchTrades, fetchOHLCV, fetchBalance, fetchCoins, timeframes, fetchTicker])
  .then(values => {
    const trades = formatTrades(values[0]);
    const candles = values[1];
    const balance = values[2];
    const coins = formatCoins(values[3]);
    const timeframes = formatTimeframes(values[4]);
    const selectedCoin = values[5];
    return {
      trades,
      candles,
      balance,
      coins,
      selectedCoin,
      timeframes
    };
  })
  .catch(err => console.log(err))
}

const formatTrades = (trades) => {
  const formattedTrades = []
  trades.forEach(trade => {
    formattedTrades.push({
      coinSymbol: trade.symbol,
      price: trade.price,
      amount: trade.amount,
      cost: trade.cost,
      time: trade.timestamp,
      orderType: trade.type,
      side: trade.side 
    })
  })
  return formattedTrades;
}

const formatCoins = (coins) => {
  const coinArray = []
  for (let coin in coins) {
    // if (coin.includes(searchParam)) {
      const coinData = coins[coin]
      const coinObject = {
        key: coinData.symbol,
        coinLogo: coinData.coinLogo,
        coinSymbol: coinData.symbol,
        price: coinData.ask,
        change: coinData.change,
        changePercent: coinData.percentage,
        volume: coinData.baseVolume
      }
      
      coinArray.push(coinObject)
      // }
    }
  return coinArray;
}

const formatTimeframes = (timeframes) => {
  const timeFrameArr = [] 
  for (let tf in timeframes) {
    timeFrameArr.push({
      id: tf,
      name: tf
    })
  }
  return timeFrameArr
}

const formatExchangeNames = (names) => {
  const formattedArr = names.map((name, i) => {
    return {
      id: i,
      name: name.exchange_name
    }
  })
  return formattedArr;
}

module.exports = { sendTime, getExchangeInfo, formatExchangeNames }