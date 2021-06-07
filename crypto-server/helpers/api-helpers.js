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

module.exports = { 
  formatCoins,
  getCoinInfo
};