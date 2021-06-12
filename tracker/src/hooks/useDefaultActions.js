import { useState, useEffect } from 'react'
import axios from 'axios'

import useUserData from './useUserData'
import useExchangeData from './useExchangeData';

export default function useDefaultsActions() {

const [allCoins, setAllCoins] = useState(null);
const [userCoins, setUserCoins] = useState(null);

const { cookies } = useUserData();

useEffect(() => {
  if (cookies.user_id) {
    loadDefaultData();
  }
}, [cookies.user_id])

// Load coin data for coin dashboard

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

// use userCoins as ref to filter watchlist
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

  return { 
    allCoins, 
    userCoins, 
    filterUserCoins 
  }
}