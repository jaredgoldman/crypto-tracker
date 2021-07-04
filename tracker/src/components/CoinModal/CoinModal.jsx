import { useState, useEffect } from 'react'
import CoinModalRow from './CoinModalRow'
import './CoinModal.scss'

export default function CoinModal(props) {

  const coinRows = props.rows.map((coin, i) => {
    return <CoinModalRow 
      key={i}
      coin={coin.name} 
      ticker={coin.ticker} 
      addUserCoin={props.addUserCoin}
    />
  })

  return (
    <div className="Modal">
      <div className="coin-table">
      <p>Add Coins to Watchlist</p>
      
          {props.alert && <p>{props.alert}</p>}

          <table>
            <thead>
              <tr>
                <td>Coin</td>
                <td>Ticker</td>
                <td>Select Coin</td>
              </tr>
            </thead>
            <tbody>
              {coinRows}
            </tbody>
          </table>
        
        <button onClick={() => props.handleShowModal()}>
          Go back
        </button>

      </div>

    </div>
  )

}