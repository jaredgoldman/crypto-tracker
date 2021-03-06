import { useEffect, useState } from 'react'
import axios from 'axios'
import './CoinDash.scss'

import Chart from "./Chart"
import CoinInfo from "./CoinInfo"
import UserCoinInfo from "./UserCoinInfo"
import TradeTable from "./TradeTable/TradeTable"

import useUserData from '../hooks/useUserData'

import { 
Arrow90degLeft
} from 'react-bootstrap-icons'

export default function CoinDash(props) {
  const { coin } = props
  const { cookies } = useUserData();

  const [timeframe, setTimeframe] = useState('day')
  const [currency, setCurrency] = useState({uuid: "yhjMzLPhuIDl", ticker: "USD"})
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    setLoading(true)
    loadCoinData();
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, currency, timeframe])

  const loadCoinData = async () => {
    if (!cookies.user_id) {
      return
    }
    const userId = cookies.user_id;
    const selectedCoin = coin.ticker;
    const uuid = coin.uuid;
    const URL = `http://localhost:3004/api/coins/show/${userId}/${selectedCoin}/${uuid}/${timeframe}/${currency.ticker}/${currency.uuid}`
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

  const handleSetTimeframe = (e) => {
    setTimeframe(e.target.value)
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
  
  <div className="coindash-wrapper">
    <div className="back-to-watchlist">
      <button 
        onClick={() => {
          window.location.href = '/watchlist'
        }}
      >
      <Arrow90degLeft color="royalblue" size={20} />
      <p>Back to Watchlist</p>
    </button>
    </div>
   {coinInfo && <div className="coindash-header"> 
      <img src={coinInfo.icon} className="coin-icon" alt={`icon for ${coinInfo.ticker}`}></img>
      <h2>{coin.name}</h2>
    </div> }
    {coinState.candles ?

    <div>

      <div className="chart-info">

        {loading ? 
          <div>Loading Coin...</div>
          :
          <div className="chart-container">
            <Chart 
              candles={candles}
              handleSetTimeframe={handleSetTimeframe}
            />
          </div> 
          }

        <div className="info-container">
          <CoinInfo 
            coinInfo={coinInfo} 
            currency={currency}
            handleQuoteCurrency={handleQuoteCurrency}
          /> 
        </div>

      </div>

      

      {userCoinStats && trades.length ?
      <div className="user-info-container">
      
        <h2 className="coindash-heading">Asset Performance</h2>   
        <div className="coindash-info">   
          <UserCoinInfo 
            userCoinStats={userCoinStats} 
            currency={currency}
            coin={coin}
          /> 
        </div>
        
        <h2 className="coindash-heading">Your Trades</h2>
        <div className="coindash-trades">
          <TradeTable rows={trades}/>
        </div> 

      </div>
      :
      <div className="user-coininfo-alert">
        <p><a href="/exchange">Add an exchange account</a> or trade this coin to see your coin stats</p>
      </div>
      } 
    
   
    </div> 
    : 
    <div>Loading...</div> }
  </div>

  )

}

