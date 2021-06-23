export default function reducer(coinState, action) {

  switch (action.type) {
    case "SET_COIN":
      return {...coinState, coin: action.value} 
    case "SET_CANDLE_LENGTH":
      return {...coinState, candleLength: action.value} 
    case "SET_CURRENCY":
      return {...coinState, currency: action.value}
    case "SET_COIN_DATA":
      return {
        ...coinState, 
        coinInfo: action.value.coinInfo.coin,
        candles: action.value.coinInfo.candles,
        trades: action.value.userCoinTrades,
        userCoinStats: action.value.coinInfo.userCoinStats
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
  
}