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
     
      <h2>Add coins to your watchlist</h2>
      <div className="coin-table">
      
          {props.alert && <p>{props.alert}</p>}

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
        <button onClick={() => props.handleShowModal()}>
          Go back
        </button>
      </div>
    </div>
  )

}