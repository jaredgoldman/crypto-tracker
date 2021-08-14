import CoinModalRow from './CoinModalRow'
import './CoinModal.scss'

export default function CoinModal({
  rows,
  addUserCoin,
  handleShowModal
}) {

  const coinRows = rows.map((coin, i) => {
    return <CoinModalRow 
      key={i}
      coin={coin.name} 
      ticker={coin.ticker} 
      addUserCoin={addUserCoin}
      coinLogo={coin.coinLogo}
    />
  })

  return (
    <div className="Modal">
     
      <h2>Add coins to your watchlist</h2>
      <div className="coin-table">
      
          {alert && <p>{alert}</p>}

          <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Ticker</th>
              </tr>
            </thead>
            <tbody>
              {coinRows}
            </tbody>
          </table>
      
      </div>
      <div className="coin-modal-back">
        <button onClick={() => handleShowModal()}>
          Go Back
        </button>
      </div>
    </div>
  )

}