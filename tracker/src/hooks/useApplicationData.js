import { useState, useEffect, useReducer } from 'react'
import reducer from '../reducers/coins'
import axios from 'axios'

import useUserData from './useUserData'
import useDefaultActions from './useDefaultActions';

export default function useApplicationData() {

  const {    
    cookies,
    handleAlert,
    setUserCoins,
    allCoins,
    userCoins
  } = useUserData();

  const {
    filterUserCoins
  } = useDefaultActions();

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
  
  // REDUCER // 
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

  // USEEFFECTS //
  useEffect( () => {
    if (coinState.coin || coinState.candleLength) {
      loadCoinData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinState.coin, coinState.candleLength])

  // COIN HELPERS //

  // adds a new coin, refreshes user coins
  const addUserCoin = (coinSymbol) => {
    const userId = cookies.user_id;
    axios.post(`http://localhost:3001/api/coins/add`, {userId, coinSymbol})
    .then(res => {
      if (res.data.alert) {
        return handleAlert(res.data.alert);
      }
      const userCoinRes = res.data.userCoins;
      const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
      setUserCoins(filteredUserCoins);
    })
    .catch(err => {
      console.log(err)
    })
  }

  // deletes a coin, refreshes user coins
  const deleteUserCoin = (coin) => {
    const userId = cookies.user_id;
    axios.post(`http://localhost:3001/api/coins/delete`, {userId, coin})
    .then(res => {
      if (res.data.alert) {
        return handleAlert(res.data.alert);
      }
      const userCoinRes = res.data.userCoins;
      const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
      setUserCoins(filteredUserCoins);
    })
    .catch(err => {
      console.log(err)
    })
  }

  // when user selects individual coin, we requests data, candles and user trades 
  const loadCoinData = async () => {
    const userId = cookies.user_id;
    const coin = coinState.coin.ticker;
    const uuid = coinState.coin.uuid;
    const URL = `http://localhost:3001/api/coins/show/${userId}/${coin}/${uuid}/${coinState.candleLength}/${currency.ticker}/${currency.uuid}`

    try {
      const res = await axios.get(URL);
      const {coinInfo, userCoinTrades, userCoinStats} = res.data;
      setCandles(coinInfo.candles);
      setCoinInfo(coinInfo.coin);
      setTrades(userCoinTrades);
      setUserCoinStats(userCoinStats);
    } catch (error) {
      console.log(error)
    }

  }
  
  return { 
    // coinegr
    addUserCoin,
    deleteUserCoin,
    setCoin,
    setCandleLength,
    setCandles,
    setCurrency,
    setTrades,
    allCoins,
    userCoins,
    coinState,
    // exchange
    trades,
    userCoinStats
    // balance
  }

}