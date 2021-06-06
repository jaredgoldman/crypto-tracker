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
  // set currency through which fiat numbers are provided
  const [currency, setCurrency] = useState({uuid: "yhjMzLPhuIDl", ticker: "USD"});
  // individual coin data
  const [coinState, dispatch] = useReducer(reducer, {
    coin: {ticker: 'BTC', uuid: 'Qwsogvtv82FCd'},
    candleLength: 'day',
    candles: null,
    coinInfo: null
  });
  // exchanges offered by ccxt
  const [exchanges, setExchanges] = useState(null)
  
  // reducer functions for show coin page
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
  useEffect( () => {
    async function fetchCoinData() {
      await loadCoinData();
      await getExchangedata(); 
    }
    if (coinState.coin || coinState.candleLength) {
      fetchCoinData();
    }
  }, [coinState.coin, coinState.candleLength])



  // adds a new coin, refreshes user coins
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

  // deletes a coin, refreshes user coins
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

  // EXCHANGE HELPERS 

  const getExchanges = async () => {
    const URL = `http://localhost:3001/api/exchange`
    const resExchanges = await axios.get(URL);
    return resExchanges.data;
  }

  const getExchangedata = async () => {
    try {
      const ccxtExchanges = await getExchanges();
      setExchanges(ccxtExchanges)
    } catch(error) {
      console.log(error)
    }
  }
  
  // COIN HELPERS

  const loadCoinData = async () => {
    const coin = coinState.coin.ticker;
    const uuid = coinState.coin.uuid;
    const URL = `http://localhost:3001/api/coins/show/${coin}/${uuid}/${coinState.candleLength}/${currency.ticker}/${currency.uuid}`

    try {
      const res = await axios.get(URL)
      setCandles(res.data.candles);
      setCoinInfo(res.data.coin);
    } catch (error) {
      console.log(error)
    }

  }

      // HELPER FUNCTIONS //

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
    // user
    handleLogin, 
    handleLogout, 
    handleRegister,
    cookies,
    alert, 
    // coinegr
    addUserCoin,
    deleteUserCoin,
    setCoin,
    setCandleLength,
    setCandles,
    setCurrency,
    allCoins,
    userCoins,
    coinState,
    // exchange
    getExchanges,
    exchanges
  }

}