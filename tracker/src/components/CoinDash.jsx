import './CoinDash.scss'

import Chart from "./Chart"
import CoinInfo from "./CoinInfo"
import UserCoinInfo from "./UserCoinInfo"
import TradeTable from "./TradeTable/TradeTable"

export default function CoinDash(props) {
  const { coinState, userCoinStats, setCandleLength, trades } = props;
  
  const handleSetCandleLength = (e) => {
    setCandleLength(e.target.value)
  }

  return (
    
  <div className="coin-dashboard">

    <div>
      <div>Select Timeframe</div>
      <select onChange={(e) => handleSetCandleLength(e)}>
        <option value={'day'}>day</option>
        <option value={'week'}>week</option>
        <option value={'month'}>month</option>
      </select>
    </div>

    <a href='/watchlist'>Back to Watchlist</a>

    {coinState.candles && 
      <div className="chart-container">
        <Chart candles={coinState.candles}/>
      </div> 
    }


    <div className="info-container">
      { coinState.coinInfo && <CoinInfo coinInfo={coinState.coinInfo}/> }
      { trades.length > 0 ? 
        <UserCoinInfo userCoinStats={userCoinStats}/> :
        <div>Add an exchange account to see coin stats</div> 
      }
    </div>

    { trades && trades.length > 0 ?
      <div>
        <TradeTable rows={trades}/>
      </div> :
      <div>Add an exchange account to see trades</div>
    }

  </div>

  )

}

