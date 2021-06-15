import { useEffect } from 'react'
import './CoinDash.scss'

import Chart from "./Chart"
import CoinInfo from "./CoinInfo"
import UserCoinInfo from "./UserCoinInfo"
import TradeTable from "./TradeTable/TradeTable"

export default function CoinDash(props) {
  const { coinState, userCoinStats, setCandleLength, trades, currency, loadCoinData } = props;
  
  const handleSetCandleLength = (e) => {
    setCandleLength(e.target.value)
  }

  useEffect( () => {
      loadCoinData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
  
  <div className="coin-dashboard">
    {coinState.coin && coinState.candles && coinState.coinInfo ?
    <div>
      
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
        <Chart candles={coinState.candles}/>
      </div> 
    
      
      <div className="info-container">
        <CoinInfo 
          coinInfo={coinState.coinInfo} 
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

