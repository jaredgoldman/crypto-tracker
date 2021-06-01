import './CoinDash.scss'

import Chart from "./Chart"
import CoinInfo from "./CoinInfo"

export default function CoinDash(props) {

  return (
  <div className="coin-dashboard">

    <div className="chart-container">
      <Chart candles={props.candles}/>
    </div>

    <div className="info-container">
      <CoinInfo/>
    </div>

  </div>
  )
}