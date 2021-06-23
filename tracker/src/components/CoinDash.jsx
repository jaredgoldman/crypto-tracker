import { useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import reducer from '../reducers/coins'
import './CoinDash.scss'

import Chart from "./Chart"
import CoinInfo from "./CoinInfo"
import UserCoinInfo from "./UserCoinInfo"
import TradeTable from "./TradeTable/TradeTable"

import useUserData from '../hooks/useUserData'
import useExchangeData from '../hooks/useExchangeData'

export default function CoinDash(props) {
  const { coin } = props
  const { cookies } = useUserData();

  const [candleLength, setCandleLength] = useState('day')
  const [currency, setCurrency] = useState({uuid: "yhjMzLPhuIDl", ticker: "USD"})
  const [trades, setTrades] = useState([])

  const [coinState, setCoinState] = useState({
    candles: null,
    coinInfo: null,
    userCoinStats: null,
  });

  const {
    candles,
    coinInfo,
    userCoinStats,
  } = coinState

  const {
    setExchangeTrades,
    exchangeTrades
  } = useExchangeData();

  useEffect( () => {
    loadCoinData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, currency, candleLength])

  const loadCoinData = async () => {
    if (!cookies.user_id) {
      return
    }
    const userId = cookies.user_id;
    const selectedCoin = coin.ticker;
    const uuid = coin.uuid;
    const URL = `http://localhost:3001/api/coins/show/${userId}/${selectedCoin}/${uuid}/${candleLength}/${currency.ticker}/${currency.uuid}`
    let res = null;

    try {
      res = await axios.get(URL);
    } catch (error) {
      console.log(error)
    }
    const { coinInfo, userCoinStats, userCoinTrades } = res.data
    setCoinState({
      coinInfo: coinInfo.coin,
      candles: coinInfo.candles,
      userCoinStats
    })
    setTrades(userCoinTrades);
  }

  const handleSetCandleLength = (e) => {
    setCandleLength(e.target.value)
  }
  
  const handleQuoteCurrency = (currency) => {
    let currencyObj = null;
    switch(currency) {
      case "USD":
        currencyObj = {uuid: "yhjMzLPhuIDl", ticker: "USD"};
        break;
      case "CAD":
        currencyObj = {uuid: "_4s0A3Uuu5ML", ticker: "CAD"};
        break;
      case "EUR":
        currencyObj = {uuid: "5k-_VTxqtCEI", ticker: "EUR"};
        break;
      case "GBP":
        currencyObj = {uuid: "Hokyui45Z38f", ticker: "GBP"};
        break;
      case "AUD":
        currencyObj = {uuid: "OEomm4hQzk_M", ticker: "AUD"};
        break;
      default:
        currencyObj = {uuid: "yhjMzLPhuIDl", ticker: "USD"};
        break;
    }
    setCurrency(currencyObj)
  }

  return (
  
  <div className="coin-dashboard">
    {coinState.candles ?
    
    <div>
      <div>Quote Currency</div>
      <select onChange={(e) => handleQuoteCurrency(e.target.value)}>
        <option value={"USD"}>USD</option>
        <option value={"CAD"}>CAD</option>
        <option value={"EUR"}>EUR</option>
        <option value={"GBP"}>GBP</option>
        <option value={"AUD"}>AUD</option>
      </select>

      <div>
        <div>Select Timeframe</div>
        <select onChange={(e) => handleSetCandleLength(e)}>
          <option value={'day'}>day</option>
          <option value={'week'}>week</option>
          <option value={'month'}>month</option>
        </select>
      </div>

      <a href='/watchlist'>Back to Watchlist</a>


  
      <div className="chart-container">
        <Chart candles={candles}/>
      </div> 
    
      
      <div className="info-container">
        <CoinInfo 
          coinInfo={coinInfo} 
          currency={currency}
        /> 
      </div>

      {userCoinStats && trades ?
      <div className="user-info-container">

        <UserCoinInfo 
          userCoinStats={userCoinStats} 
          currency={currency}
        /> 
        
        <div>
          <TradeTable rows={trades}/>
        </div> 

      </div>
      :
      <div><a href="/exchange">Add an exchange account</a> or trade this coin to see your coin stats!</div>
      } 
    
   
    </div> : 
    <div>Loading...</div>}

  </div>

  )

}

