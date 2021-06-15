import { useState } from 'react'
import axios from 'axios'
import UseUserData from './useUserData';

export default function useWatchListData() {
  const [allCoins, setAllCoins] = useState(null);
  const [userCoins, setUserCoins] = useState(null);

  const { cookies, handleAlert } = UseUserData();

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

    return { addUserCoin, deleteUserCoin, loadDefaultData, userCoins, allCoins }
}