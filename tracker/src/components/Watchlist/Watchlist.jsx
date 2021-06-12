import "./Watchlist.scss"
import WatchlistRow from "./WatchlistRow"
import CoinModal from '../CoinModal/CoinModal'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Watchlist(props) {
  const { alert, cookies, handleAlert, setCoin } = props;
  
  const [allCoins, setAllCoins] = useState(null);
  const [userCoins, setUserCoins] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(prevShowModal => !prevShowModal)
  }

  useEffect(() => {
    "USEEFFECT"
    loadDefaultData();
  } ,[])

  const loadDefaultData = async () => {
    const URL = `http://localhost:3001/api/coins/${cookies.user_id}`
    try {
      const defualtData = await axios.get(URL);
      const allCoins = defualtData.data.coins;
      const userCoinRes = defualtData.data.userCoins;
      const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
      setAllCoins(allCoins);
      setUserCoins(filteredUserCoins);
    } catch(error) {
      console.log(error)
    }
  }

  const addUserCoin = (coinSymbol) => {
    const userId = cookies.user_id;
    axios.post(`http://localhost:3001/api/coins/add`, {userId, coinSymbol})
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
    axios.post(`http://localhost:3001/api/coins/delete`, {userId, coin})
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

  // userCoins.map((row, i) => {
  //   return <WatchlistRow
  //     key={i}
  //     coinLogo={row.iconUrl}
  //     ticker={row.ticker}
  //     rank={row.rank}
  //     name={row.name}
  //     price={row.price}
  //     changePercent={row.changePercent}
  //     volume={row.volume}
  //     marketCap={row.marketCap}
  //     uuid={row.uuid}
  //     setCoin={setCoin}
  //     deleteUserCoin={deleteUserCoin}
  //   />
  // })

  return (
    <div className="table-wrapper">
      <button onClick={() => handleShowModal()}>Add Coins</button>
    {userCoins ? <table>
        <thead>
          <tr>
            <td>Icon</td>
            <td>Ticker</td>
            <td>Rank</td>
            <td>Name</td>
            <td>Price</td>
            <td>24h%</td>
            <td>Volume (24h)</td>y
            
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