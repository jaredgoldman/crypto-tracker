import { useState, useEffect, useReducer } from 'react'
import { useCookies } from 'react-cookie';
import reducer from '../reducers/coins'

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
  const [coinState, dispatch] = useReducer(reducer, {
    coin: {ticker: 'BTC', uuid: 'Qwsogvtv82FCd'},
    candleLength: 'day',
    candles: null,
    coinInfo: null
  });
  
  const setCoin = (coin) => {
    dispatch({type: "SET_COIN", value: coin});
  }

  const setCoinInfo = (coinInfo) => {
    dispatch({type: "SET_COIN_INFO", value: coinInfo})
  }

  const setCandleLength = (candleLength) => {
    dispatch({type: "SET_CANDLE_LENGTH", value: candleLength});
  }
  
  const setCandles = (candles) => {
    dispatch({type: "SET_CANDLES", value: candles})
  }

  // Load watchlist and top 100 coins when user signs in 
  useEffect(() => {
    if (cookies.user_id) {
      const URL = `http://localhost:3001/api/coins/${cookies.user_id}`
      axios.get(URL)
      .then(res => {
        const allCoins = res.data.coins;
        const userCoinRes = res.data.userCoins;
        const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
        setAllCoins(allCoins);
        setUserCoins(filteredUserCoins);
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [cookies.user_id])

  // Load coin data for coin dashboard
  useEffect(() => {
    if (coinState.coin || coinState.candleLength) {
      const coin = coinState.coin.ticker;
      const uuid = coinState.coin.uuid;
      const URL = `http://localhost:3001/api/coins/show/${coin}/${uuid}/${coinState.candleLength}`
      axios.get(URL)
      .then(res => {
        setCandles(res.data.candles);
        setCoinInfo(res.data.coinInfo);
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [coinState.coin, coinState.candleLength])

  // adds a new coin to a users watchlist and returns entire list of user coins 
  const addUserCoin = (coinSymbol) => {
    const userId = cookies.user_id;

    axios.post(`http://localhost:3001/api/coins/add`, {userId, coinSymbol})
    .then(res => {
      const userCoinRes = res.data;
      const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
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

  // const filterUserCoins = (userCoins, allCoins) => {
    
  // }

  return { 
    handleLogin, 
    handleLogout, 
    handleRegister,
    addUserCoin,
    setCoin,
    setCandleLength,
    setCandles,
    cookies, 
    alert, 
    allCoins,
    userCoins,
    coinState
  }

}