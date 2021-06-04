import {useEffect} from 'react'
import axios from 'axios'

import './CoinDash.scss'

import Chart from "./Chart"
import CoinInfo from "./CoinInfo"

export default function CoinDash(props) {
  const { coinState, setCandleLength, setCandleNumber } = props;

  const handleSetCandleLength = (length) => {
    setCandleLength(length)
  }

  const handleSetCandleNumber = (number) => {
    setCandleNumber(number)
  }

  return (
  <div className="coin-dashboard">

    <div className="chart-container">
      <Chart candles={coinState.candles}/>
    </div>

    <div className="info-container">
      <CoinInfo/>
    </div>

    <div>
      <div>Select candle length</div>
      <select>
        <option value={'15m'}>15 minutes</option>
        <option value={'30m'}>30 minutes</option>
        <option value={'1h'}>1 hour</option>
        <option value={'6h'}>6 hours</option>
        <option value={'12h'}>12 hours</option>
        <option value={'1d'}>1 day</option>
      </select>
      <div>Select timeframe</div>
      <select>
        <option value={'1d'}>1 day</option>
        <option value={'1w'}>1 week</option>
        <option value={'1m'}>1 month</option>
      </select>
    </div>

  </div>
  )
}