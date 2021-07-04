import { useState, useEffect } from 'react'
import axios from 'axios'
import "./Watchlist.scss"
import WatchlistRow from "./WatchlistRow"
import CoinModal from '../CoinModal/CoinModal'
import UseUserData from "../../hooks/useUserData"

export default function Watchlist(props) {
  const { setCoin } = props;
  const [showModal, setShowModal] = useState(false);
  const [allCoins, setAllCoins] = useState(null);
  const [userCoins, setUserCoins] = useState(null);
  const { cookies, handleAlert } = UseUserData();
  const [loading, setLoading] = useState(false);

  const handleShowModal = () => {
    setShowModal(prevShowModal => !prevShowModal)
  }

  useEffect(() => {
    setLoading(true);
    loadWatchlistData();
    setLoading(false);
    // eslint-disable-next-line
  } ,[])

  const loadWatchlistData = async () => {
    console.log(cookies.user_id)
    const URL = `http://localhost:3004/api/coins/${cookies.user_id}`
    try {
      const defualtData = await axios.get(URL);
      const allCoins = defualtData.data.coins;
      const userCoinRes = defualtData.data.userCoins;
      const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
      setAllCoins(allCoins);
      if (!filteredUserCoins.length) {
        setUserCoins(null)
      } else {
        setUserCoins(filteredUserCoins)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const addUserCoin = (coinSymbol) => {
    const userId = cookies.user_id;
    axios.post(`http://localhost:3004/api/coins/add`, {userId, coinSymbol})
    .then(res => {
      if (res.data.alert) {
        return handleAlert(res.data.alert);
      }
      const userCoinRes = res.data.userCoins;
      const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
      setUserCoins(filteredUserCoins);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const deleteUserCoin = (coin) => {
    const userId = cookies.user_id;
    axios.post(`http://localhost:3004/api/coins/delete`, {userId, coin})
    .then(res => {
      if (res.data.alert) {
        return handleAlert(res.data.alert);
      }
      const userCoinRes = res.data.userCoins;
      const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
      setUserCoins(filteredUserCoins);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const filterUserCoins = (userCoins, allCoins) => {
    const userCoinArr = [];
    userCoins.forEach(coin => {
      for (let c of allCoins) {
        if (coin.symbol === c.ticker) {
          userCoinArr.push(c);
        }
      }
    })
    return userCoinArr
    }

  if (loading) {
    return <div>Loading watchlist...</div>
  }

  return (
    <div className="watchlist-wrapper">
      <h1 className="watchlist-heading">Your Watchlist</h1>
      <div className="table-wrapper">
        
      {userCoins ? 
      <div>
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
          </table>
          <button className="add-coins-button" onClick={() => handleShowModal()}>Add Coins</button>
        </div>
         : 
        <div>
          <div>Add coins to your watchlist to get started!</div>
          <button className="add-coins-button" onClick={() => handleShowModal()}>Add Coins</button>
        </div>
        }
      {showModal && <CoinModal handleShowModal={handleShowModal} rows={allCoins} addUserCoin={addUserCoin} alert={alert}/>}
      </div>
    </div>
  )

}