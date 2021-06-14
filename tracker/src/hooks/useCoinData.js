import { useState, useEffect, useReducer } from 'react'
import reducer from '../reducers/coins'
import axios from 'axios'

import useUserData from './useUserData'

export default function useCoinData() {

  const {    
    cookies,
    allCoins,
    userCoins
  } = useUserData();

  // STATE //
  const [currency, setCurrency] = useState({uuid: "yhjMzLPhuIDl", ticker: "USD"});
  const [userCoinStats, setUserCoinStats] = useState(null)
  const [trades, setTrades] = useState(null);
  const [coinState, dispatch] = useReducer(reducer, {
    coin: {ticker: 'BTC', uuid: 'Qwsogvtv82FCd'},
    candleLength: 'day',
    candles: null,
    coinInfo: null
  });
  
  // REDUCER FOR COINSTATE // 
  const setCoin = (coin) => {
    dispatch({type: "SET_COIN", value: coin});
  }

  const setCoinInfo = (coinInfo) => {
    dispatch({type: "SET_COIN_INFO", value: coinInfo})
  }

  const setCandleLength = (candleLength) => {
    dispatch({type: "SET_CANDLE_LENGTH", value: candleLength});
  }
  
  const setCandles = (candles) => {
    dispatch({type: "SET_CANDLES", value: candles})
  }

  // load coin data every time a user selects a new coin
  // useEffect( () => {
  //   if (coinState.coin || coinState.candleLength) {
  //     loadCoinData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [coinState.coin, coinState.candleLength])

  // when user selects individual coin, we requests data, candles and user trades 
  const loadCoinData = async () => {
    if (!cookies.user_id) {
      return
    }
    const userId = cookies.user_id;
    const coin = coinState.coin.ticker;
    const uuid = coinState.coin.uuid;
    const URL = `http://localhost:3001/api/coins/show/${userId}/${coin}/${uuid}/${coinState.candleLength}/${currency.ticker}/${currency.uuid}`

    try {
      const res = await axios.get(URL);
      const {coinInfo, userCoinTrades, userCoinStats} = res.data;
      setCandles(coinInfo.candles);
      setCoinInfo(coinInfo.coin);
      if (!userCoinTrades.length) {
        setTrades(null);
      }
      if (!userCoinStats.pL) {
        setUserCoinStats(null);
      }
    } catch (error) {
      console.log(error)
    }

  }
  
  return { 
    setCoin,
    setCandleLength,
    setCandles,
    setCurrency,
    setTrades,
    loadCoinData,
    allCoins,
    userCoins,
    coinState,
    trades,
    userCoinStats,
    currency
  }

}