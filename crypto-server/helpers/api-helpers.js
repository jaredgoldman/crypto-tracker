const axios = require('axios');

// REQUESTS //

const getCandles = async (coin, candleLength) => {
  const candleData = formatCandleRequest(candleLength);
  const URL = `https://min-api.cryptocompare.com/data/v2/histo${candleData.candleUnit}?fsym=${coin}&tsym=USD&limit=${candleData.candleAmount}&api_key=${process.env.CC_API}`
  try {
    const candles = await axios.get(URL);
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
    console.log(coinInfo.data.data.coin)
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
    return [candle.time, candle.open, candle.high, candle.low, candle.close];
  })
  return formattedCandles;
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