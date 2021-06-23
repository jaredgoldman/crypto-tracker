import "./Watchlist.scss"
import WatchlistRow from "./WatchlistRow"
import CoinModal from '../CoinModal/CoinModal'
import { useState, useEffect } from 'react'
import useWatchListData from "../../hooks/useWatchListData"
import UseUserData from "../../hooks/useUserData"

export default function Watchlist(props) {
  const { setCoin } = props;
  const { alert } = UseUserData();
  
  const {
    addUserCoin, 
    deleteUserCoin, 
    loadDefaultData,
    userCoins,
    allCoins
  } = useWatchListData();

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(prevShowModal => !prevShowModal)
  }

  useEffect(() => {
    loadDefaultData();
    // eslint-disable-next-line
  } ,[])

  return (
    <div className="table-wrapper">
      <button onClick={() => handleShowModal()}>Add Coins</button>
    {userCoins ? 
    <table>
        <thead>
          <tr>
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
          {userCoins.map((row, i) => {
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
            uuid={row.uuid}
            setCoin={setCoin}
            deleteUserCoin={deleteUserCoin}
          />
        })}
        </tbody> 
      </table> : 
      <div>Loading watchlist...</div>
      }

    {showModal && <CoinModal handleShowModal={handleShowModal} rows={allCoins} addUserCoin={addUserCoin} alert={alert}/>}
     
    </div>
  )

}