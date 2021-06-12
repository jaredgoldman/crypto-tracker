import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function UseUserData() {

  const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
  const [alert, setAlert] = useState(null);
  
  const handleAlert = (alert) => {
    setAlert(alert)
    setTimeout(() => {
      setAlert(null);
    }, 3000)
  }
  
  const handleLogin = async (userData) => {
    const { password, email } = userData;
    if (!password || !email) {
      handleAlert('please enter a valid password and email')
    }
    const res = await axios.post(`http://localhost:3001/api/users/login`, {password, email})
    if (res.data.alert) {
      return handleAlert(res.data.alert)
    }
    if (res.status === 200) {
      setCookie('user_id', res.data.user_id, { path: '/' });
    }
  }

  // when user logs in, load all coins and coin watchlist 
  // useEffect(() => {
  //   if (cookies.user_id) {
  //     loadDefaultData();
  //   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cookies.user_id])

  const handleLogout = () => {
    removeCookie("user_id");
  }
  
  const handleRegister = async (userData) => {
    const { firstName, lastName, password, email } = userData;
    if (!firstName || !lastName || !email || !password) {
      return handleAlert("Please enter a valid email and password")
    }
    const res = await axios.post(`http://localhost:3001/api/users/register`, {firstName, lastName, password, email})
    if (res.data.alert) {
      return handleAlert(res.data.alert)
    }
    if (res) {
      setCookie('user_id', res.data.id, { path: '/' });
    }
  }

  // // coins from crypto ranking
  // const [allCoins, setAllCoins] = useState(null);
  // // coins user has on watchlist
  // const [userCoins, setUserCoins] = useState(null);

  // const loadDefaultData = async () => {
  //   console.log(cookies.user_id)
  //   const URL = `http://localhost:3001/api/coins/${cookies.user_id}`
  //   try {
  //     const defualtData = await axios.get(URL);
  //     const allCoins = defualtData.data.coins;
  //     const userCoinRes = defualtData.data.userCoins;
  //     const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
  //     setAllCoins(allCoins);
  //     setUserCoins(filteredUserCoins);
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

  //  // use userCoins as ref to filter watchlist
  //  const filterUserCoins = (userCoins, allCoins) => {
  //   const userCoinArr = [];
  //   userCoins.forEach(coin => {
  //     for (let c of allCoins) {
  //       if (coin.symbol === c.ticker) {
  //         userCoinArr.push(c);
  //       }
  //     }
  //   })
  //   return userCoinArr
  // }

  return { 
    handleLogin, 
    handleLogout, 
    handleAlert, 
    handleRegister, 
    // filterUserCoins, 
    // setUserCoins,
    cookies, 
    alert, 
  } 
}