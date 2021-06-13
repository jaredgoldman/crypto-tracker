const axios = require('axios');

const crConfig = {
  headers: {
    'x-access-token': process.env.CR_API
  }
}
// REQUESTS //

const getCoinInfo = async (coin, uuid, candleLength, currencyTicker, currencyUuid) => {
  let coinInfo = null;
  let candles = null;

  const candleData = formatCandleRequest(candleLength);

  const infoURL = `https://api.coinranking.com/v2/coin/${uuid}?referenceCurrencyUuid=${currencyUuid}`
  const candleURL = `https://min-api.cryptocompare.com/data/v2/histo${candleData.candleUnit}?fsym=${coin}&tsym=${currencyTicker}&limit=${candleData.candleAmount}&api_key=${process.env.CC_API}`

  try {
    coinInfo = await axios.get(infoURL, crConfig)
  } catch(error) {
    console.log(error)
  }

  try {
    candles = await axios.get(candleURL, crConfig)
  } catch(error) {
    console.log(error)
  }

  const formattedCandles = formatCandles(candles.data.Data.Data);
  const formattedCoinInfo = formatCoinInfo(coinInfo.data.data.coin);
  return {coin: formattedCoinInfo, candles: formattedCandles}
}

// REQUEST HELPER FUNCTIONS //

// formats coins res from cryptoranking 
const formatCoins = (coins) => {
  const formattedCoins = coins.map(coin => {
    return {
      coinLogo: coin.iconUrl,
      ticker: coin.symbol,
      rank: coin.rank,
      name: coin.name,
      price: coin.price,
      changePercent: coin.change,
      volume: coin['24hVolume'],
      marketCap: coin.marketCap,
      uuid: coin.uuid
    }
  })
  return formattedCoins;
}

// formats candles from crypto compare
const formatCandles = (candles) => {
  const formattedCandles = candles.map(candle => {
    return [candle.time * 1000, candle.open, candle.high, candle.low, candle.close];
  })
  return formattedCandles;
}

const formatCoinInfo = (coinInfo) => {
  return {
    ticker: coinInfo.symbol,
    icon: coinInfo.iconUrl,
    website: coinInfo.websiteUrl,
    totalSupply: coinInfo.supply.total,
    volume: coinInfo['24hVolume'],
    marketCap: coinInfo.marketCap,
    price: coinInfo.price,
    btcPrice: coinInfo.btcPrice,
    change: coinInfo.change,
    rank: coinInfo.rank,
    allTimeHigh: coinInfo.allTimeHigh
  }
}

const formatCandleRequest = (candleLength) => {
  if (candleLength === 'day') {
    return {
      candleUnit: 'hour',
      candleAmount: 24
    }
  }
  if (candleLength === 'week') {
    return {
      candleUnit: 'hour',
      candleAmount: 168
    }  
  }
  if (candleLength === 'month') {
    return {
      candleUnit: 'day',
      candleAmount: 30
    } 
  }
}

// COIN STATS HELPERS //
const getUserStats = async (trades, currency, coinInfo) => {
  // get conversion rate
  const rates = await getConversionRates(currency);
  // loop through each trade
  const convertedTrades = convertTrades(trades, currency, rates); 

  const pL = calculatePL(trades, coinInfo.coin.price);
 
  const average = calculateAverage(trades);

  return { pL, average }
}

const calculatePL = (trades, currentPrice) => {

  let costs = 0;
  let amounts = 0;
    for(let trade of trades) {
      costs += trade.cost;
      amounts += trade.amount;
      // console.log(costs, amounts)
    }
  let pL =(((currentPrice * amounts) - costs) /costs) * 100;
  return pL
  // return ((pL > 0) ? "+" + pL : pL);
}

const calculateAverage = (trades) => {
  let priceTotal = 0;
  let tradesArray = [];
  trades.forEach(trade => {
      priceTotal += trade.unitPrice;  
      tradesArray.push(trade);
  })
  return (priceTotal / tradesArray.length).toFixed(2);
}

const convertTrades = (trades, currency, rates) => {
  return trades.map(trade => {
    if (trade.quoteCurrency === currency || `${currency}T`) {
        return trade;
    } 
    return {
      unitPrice: trade.unitPrice * rates[trade.quoteCurrency],
      cost: trade.cost * rates[trade.quoteCurrency],
      amount: trade.amount,
      quoteCurrency: currency,
      converted: true,
      ...trade
    }
  })
}

const getConversionRates = async (currency) => {
  const res = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.ER_API}/latest/${currency}`);
  return res.data.conversion_rates;
}

module.exports = { 
  formatCoins,
  getCoinInfo,
  getUserStats
};