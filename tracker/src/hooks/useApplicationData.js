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

      // EXCHANGE FUNCTIONS/STATE //

  // coins from crypto ranking
  const [allCoins, setAllCoins] = useState(null);
  // coins user has on watchlist
  const [userCoins, setUserCoins] = useState(null);

  const addUserCoin = (coinSymbol) => {
    const userId = cookies.user_id;

    axios.post(`http://localhost:3001/api/coins/add`, {userId, coinSymbol})
    .then(res => {
      const coins = res.data;
      const userCoins = [];
      
      coins.forEach(coin => {
        for (let c of allCoins) {
          if (coin.symbol === c.ticker) {
            userCoins.push(c);
          }
        }
      })
      setUserCoins(userCoins)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // Load coins when user signs in 
  useEffect(() => {
    if (cookies.user_id) {
      axios.get(`http://localhost:3001/api/coins/all`)
      .then(res => {
        setAllCoins(res.data);
      })
    }
  }, [cookies.user_id])

  return { 
    handleLogin, 
    handleLogout, 
    handleRegister,
    addUserCoin, 
    cookies, 
    alert, 
    allCoins 
  }

}