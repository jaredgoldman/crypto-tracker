export default function reducer(coinState, action) {

  switch (action.type) {
    case "SET_COIN":
      return {...coinState, coin: action.value} 
    case "SET_COIN_INFO":
      return {...coinState, coinInfo: action.value} 
    case "SET_CANDLE_LENGTH":
      return {...coinState, candleLength: action.value} 
    case "SET_CANDLES":
      return {...coinState, candles: action.value} 
  }
}