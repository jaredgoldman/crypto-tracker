import './CoinDash.scss'

import Chart from "./Chart"
import CoinInfo from "./CoinInfo"
import TradeTable from "./TradeTable/TradeTable"

export default function CoinDash(props) {
  const { coinState, setCandleLength, trades } = props;
  
  const handleSetCandleLength = (e) => {
    setCandleLength(e.target.value)
  }

  // const filterTrades = () => {
  //   const filteredTrades = trades.filter(trade => coinState.coin.ticker === trade.baseCurrency)
  //   return filteredTrades
  // }

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

    <div className="chart-container">
      <Chart candles={coinState.candles}/>
    </div>

    <div className="info-container">
      <CoinInfo coinInfo={coinState.coinInfo}/>
    </div>

    {trades &&
      <div>
        <TradeTable rows={trades}/>
      </div> 
    }

  </div>
  )


}

