import { useState } from 'react'

import "./Watchlist.scss"
import WatchlistRow from "./WatchlistRow"
import CoinModal from '../CoinModal/CoinModal'

export default function Watchlist(props) {

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(prevShowModal => !prevShowModal)
  }

  const tableRows = props.userCoins.map((row, i) => {
    return <WatchlistRow
      key={i}
      coinLogo={row.iconUrl}
      ticker={row.ticker}
      rank={row.rank}
      name={row.name}
      price={row.price}
      changePercent={row.changePercent}
      volume={row.volume}
      marketCap={row.marketCap}
    />
  })

  return (
    <div className="table-wrapper">
      <button onClick={() => handleShowModal()}>Add Coins</button>
      <table>
        <thead>
          <tr>
            <td>Icon</td>
            <td>Ticker</td>
            <td>Rank</td>
            <td>Name</td>
            <td>Price</td>
            <td>24h%</td>
            <td>Volume (24h)</td>
            <td>Market Cap</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="tbody">
          {tableRows}
        </tbody>
      </table>

    {showModal && <CoinModal handleShowModal={handleShowModal} rows={props.allCoins} addUserCoin={props.addUserCoin}/>}
     
    </div>
  )

}