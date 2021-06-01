import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import axios from 'axios'

export default function useApplicationData() {

      // USER FUNCTIONS/STATE // 

  const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
  const [alert, setAlert] = useState(null);

  const handleAlert = (alert) => {
    setAlert(alert)
    setTimeout(() => {
      setAlert(null);
    }, 3000)
  }

  const handleLogin = (userData) => {
    const { password, email } = userData;
    axios
    .post(`http://localhost:3001/api/users/login`, {password, email})
    .then((res) => {
      if (res.status === 200) {
        setCookie('user_id', res.data, { path: '/' });
      }
    })
    .catch((err) => {
      handleAlert(err.response.data);
    });
  }

  const handleLogout = () => {
    removeCookie("user_id");
  }

  const handleRegister = (userData) => {
    const { firstName, lastName, password, email } = userData;
    axios
    .post(`http://localhost:3001/api/users/register`, {firstName, lastName, password, email})
    .then(res => {
      if (res) {
        return setCookie('user_id', res.data.id, { path: '/' });
      }
    })
    .catch((err) => {
      handleAlert(err.response.data)
    });
  }

      // COIN FUNCTIONS/STATE //

  // coins from crypto ranking
  const [allCoins, setAllCoins] = useState(null);
  // coins user has on watchlist
  const [userCoins, setUserCoins] = useState(null);
  // individual coin data
  const [candles, setCandles] = useState(null)

  // loads data for specific coin selected on watchlist
  const loadCoinData = (coinSymbol) => {
    console.log('firing axios request')
    axios.get(`http://localhost:3001/api/coins/show/${coinSymbol}`)
    .then(res => {
      setCandles(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  // Load watchlist and top 100 coins when user signs in 
  useEffect(() => {
    if (cookies.user_id) {
      axios.get(`http://localhost:3001/api/coins/${cookies.user_id}`)
      .then(res => {
        const allCoins = res.data.coins;
        const userCoins = res.data.userCoins;
        const filteredUserCoins = filterUserCoins(userCoins, allCoins);
        setAllCoins(allCoins);
        setUserCoins(filteredUserCoins);
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [cookies.user_id])

  // adds a new coin to a users watchlist and returns entire list of user coins 
  const addUserCoin = (coinSymbol) => {
    const userId = cookies.user_id;

    axios.post(`http://localhost:3001/api/coins/add`, {userId, coinSymbol})
    .then(res => {
      const userCoins = res.data;
      const filteredUserCoins = filterUserCoins(userCoins, allCoins);
      setUserCoins(filteredUserCoins);
    })
    .catch(err => {
      console.log(err)
    })
  }

      // HELPER FUNCTIONS //

  // use userCoins to filter allCoins list 
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
    handleLogin, 
    handleLogout, 
    handleRegister,
    addUserCoin,
    loadCoinData, 
    cookies, 
    alert, 
    allCoins,
    userCoins,
    candles
  }

}