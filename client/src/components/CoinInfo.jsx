import "./CoinInfo.scss"

export default function CoinInfo(props) {
const { coinInfo, currency, handleQuoteCurrency } = props

const athDate = new Date(coinInfo.allTimeHigh.timestamp * 1000).toDateString()

  return (

    <div className="coininfo">
    
    <div className="coininfo-select">
    <h5>Quote Currency</h5>
      <select onChange={(e) => handleQuoteCurrency(e.target.value)}>
        <option value={"USD"}>USD</option>
        <option value={"CAD"}>CAD</option>
        <option value={"EUR"}>EUR</option>
        <option value={"GBP"}>GBP</option>
        <option value={"AUD"}>AUD</option>
      </select>
    </div>

      <table className="coininfo-table">
        <tr>
          <td>
            <h2>Symbol</h2>
            <p>{coinInfo.ticker}</p>
          </td>
          <td>
            <h2>Rank</h2>
            <p>#{coinInfo.rank}</p>
          </td>
        </tr>
        <tr>
          <td>
            <h2>Price</h2>
            <p>
              {coinInfo.price < 1 ? coinInfo.price.toFixed(8) : coinInfo.price.toFixed(2) } {currency.ticker}
            </p>
          </td>
          <td>
            <h2>Price (BTC)</h2>
            <p>
              {coinInfo.btcPrice} 
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <h2>24h Change</h2>
            <p>{coinInfo.change}%</p>
          </td>
          <td>
            <h2>Total Supply</h2>
            <p>${coinInfo.totalSupply} {coinInfo.ticker}</p>
          </td>
        </tr>
        <tr>
          <td>
            <h2>Market Cap</h2>
            <p>${coinInfo.marketCap} {currency.ticker}</p>
          </td>
          <td>
            <h2>Volume</h2>
            <p>${coinInfo.volume} {currency.ticker}</p>
          </td>
        </tr>
        <td colSpan={2} className="ath-heading"><h2>All Time High</h2></td>
        <tr>
          <td colSpan={2} >
            <p>${Number(coinInfo.allTimeHigh.price).toFixed(2)} {currency.ticker} on {athDate} </p>
          </td>
        </tr>
      </table>

    </div>
  )

}