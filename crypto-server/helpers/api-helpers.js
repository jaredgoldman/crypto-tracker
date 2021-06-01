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
      marketCap: coin.marketCap
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

module.exports = { formatCoins, formatCandles };