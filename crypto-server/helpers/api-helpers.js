const axios = require('axios');

// REQUESTS //

const getCandles = async (coin, candleLength) => {
  const candleData = formatCandleRequest(candleLength);
  const URL = `https://min-api.cryptocompare.com/data/v2/histo${candleData.candleUnit}?fsym=${coin}&tsym=USD&limit=${candleData.candleAmount}&api_key=${process.env.CC_API}`
  try {
    const candles = await axios.get(URL);
    console.log(candles.data)
    return formatCandles(candles.data.Data.Data);
  } catch(error) {
    console.log(error)
  }
}

const getCoinInfo = async (uuid) => {
  const config = {
    headers: {
      'x-access-token': process.env.CR_API
    }
  }
  const URL = `https://api.coinranking.com/v2/coin/${uuid}`
  try {
    const coinInfo = await axios.get(URL, config)
    return formatCoinInfo(coinInfo.data.data.coin);
  } catch(error) {
    console.log(error)
  }
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
  getCandles,
  getCoinInfo
};