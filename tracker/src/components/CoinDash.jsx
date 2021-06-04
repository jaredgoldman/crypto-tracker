import './CoinDash.scss'

import Chart from "./Chart"
import CoinInfo from "./CoinInfo"

export default function CoinDash(props) {
  const { coinState, setCandleLength } = props;

  const handleSetCandleLength = (e) => {
    setCandleLength(e.target.value)
  }

  // const handleSetCandleNumber = (e) => {
  //   setCandleNumber(e.target.value)
  // }

  return (
  <div className="coin-dashboard">

    <div className="chart-container">
      <Chart candles={coinState.candles}/>
    </div>

    <div className="info-container">
      <CoinInfo/>
    </div>

    <div>
      <div>Select Timeframe</div>
      <select onChange={(e) => handleSetCandleLength(e)}>
        <option value={'day'}>day</option>
        <option value={'week'}>week</option>
        <option value={'month'}>month</option>
      </select>
      {/* <div>Select timeframe</div>
      <select onChange={(e) => handleSetCandleNumber(e)}>
        <option value={'1d'}>1 day</option>
        <option value={'1w'}>1 week</option>
        <option value={'1m'}>1 month</option>
      </select> */}
    </div>

  </div>
  )
}