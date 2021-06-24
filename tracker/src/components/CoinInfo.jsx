import "./CoinInfo.scss"

export default function CoinInfo(props) {
const { coinInfo, currency } = props

// if price is less than a dollar
// display price with 8 floating points 
// if not, display price with two floating points 



  return (
    <div className="coin-info">
      <div>
        <img src={coinInfo.icon} alt={`icon for ${coinInfo.ticker}`}></img>
      </div>
      <div>
        <h2>Symbol</h2>
        <p>{coinInfo.ticker}</p>
      </div>
      <div>
        <h2>Rank</h2>
        <p>#{coinInfo.rank}</p>
      </div>
      {coinInfo.website && <div>
        <h2>website</h2>
        <p>{coinInfo.ticker}</p>
      </div>}
      <div>
        <h2>Price</h2>
        <p>
          {coinInfo.price < 1 ? coinInfo.price.toFixed(8) : coinInfo.price.toFixed(2) } {currency.ticker}
        </p>
      </div>
      <div>
        <h2>Price (BTC)</h2>
        <p>
          {coinInfo.btcPrice} 
        </p>
      </div>
      <div>
        <h2>24h Change</h2>
        <p>{coinInfo.change}%</p>
      </div>
      <div>
        <h2>Total Supply</h2>
        <p>${coinInfo.totalSupply} {coinInfo.ticker}</p>
      </div>
      <div>
        <h2>Market Cap</h2>
        <p>${coinInfo.marketCap} {currency.ticker}</p>
      </div>
      <div>
        <h2>Volume</h2>
        <p>${coinInfo.volume} {currency.ticker}</p>
      </div>
      <div>
        <h2>ATH</h2>
        <p>${coinInfo.allTimeHigh.price} {currency.ticker}</p>
        <p>${coinInfo.allTimeHigh.timestamp} {currency.ticker}</p>
      </div>
    </div>
  )

}