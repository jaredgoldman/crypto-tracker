import { useReducer, useEffect } from 'react'
import reducer from '../reducers/coins'
import axios from 'axios'

import useUserData from './useUserData'

export default function useCoinData() {

  const {    
    cookies,
  } = useUserData();

  
  // STATE //
  const [coinState, dispatch] = useReducer(reducer, {
    coin: {ticker: "BTC", uuid: "Qwsogvtv82FCd"},
    candleLength: 'day',
    candles: null,
    coinInfo: null,
    trades: null,
    userCoinStats: null,
    currency: {uuid: "yhjMzLPhuIDl", ticker: "USD"}
  });

  // REDUCER FOR COINSTATE // 
  const setCoin = (coin) => {
    dispatch({type: "SET_COIN", value: coin});
  }

  const setCandleLength = (candleLength) => {
    dispatch({type: "SET_CANDLE_LENGTH", value: candleLength});
  }

  const setCurrency = (currency) => {
    dispatch({type: 'SET_CURRENCY', value: currency})
  }

  const setCoinData = (coinData) => {
    dispatch({type: 'SET_COIN_DATA', value: coinData})
  }

  // useEffect(() => { 
  //   if (coinState.coin)
  //   loadCoinData();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [coinState.coin, coinState.candleLength, coinState.currency])

  // when user selects individual coin, we requests data, candles and user trades 
  // const loadCoinData = async () => {
  //   const { currency, candleLength, coin } = coinState;
  //   if (!cookies.user_id) {
  //     return
  //   }
  //   const userId = cookies.user_id;
  //   const selectedCoin = coin.ticker;
  //   const uuid = coin.uuid;
  //   const URL = `http://localhost:3001/api/coins/show/${userId}/${selectedCoin}/${uuid}/${candleLength}/${currency.ticker}/${currency.uuid}`
  //   let res = null;

  //   try {
  //     res = await axios.get(URL);
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   await setCoinData(res.data)
  // }
  

  return { 
    setCoin,
    setCandleLength,
    setCurrency,
    coinState,
  }

}