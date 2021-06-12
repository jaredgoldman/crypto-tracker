// import { useReducer, useState} from 'react'
// import reducer from '../reducers/coins'
// import axios from 'axios'
// import useDefaultActions from './useDefaultActions'
// import useUserData from './useUserData'

// export default function useCoinData() {

//   const { cookies, handleAlert } = useUserData();
  
//   const { allCoins, userCoins, setUserCoins } = useDefaultActions();
//   // const [allCoins, setAllCoins] = useState(null);
//   // // coins user has on watchlist
//   // const [userCoins, setUserCoins] = useState(null);
//   // set currency through which fiat numbers are provided
//   const [currency, setCurrency] = useState({uuid: "yhjMzLPhuIDl", ticker: "USD"});
//   // individual coin data
//   const [coinState, dispatch] = useReducer(reducer, {
//     coin: {ticker: 'BTC', uuid: 'Qwsogvtv82FCd'},
//     candleLength: 'day',
//     candles: null,
//     coinInfo: null
//   });

//   const [userCoinStats, setUserCoinStats] = useState(null)

//   const [trades, setTrades] = useState(null);

//   // REDUCER FUNCTIONS 

//   const setCoin = (coin) => {
//     dispatch({type: "SET_COIN", value: coin});
//   }

//   const setCoinInfo = (coinInfo) => {
//     dispatch({type: "SET_COIN_INFO", value: coinInfo})
//   }

//   const setCandleLength = (candleLength) => {
//     dispatch({type: "SET_CANDLE_LENGTH", value: candleLength});
//   }
  
//   const setCandles = (candles) => {
//     dispatch({type: "SET_CANDLES", value: candles})
//   }

//   // adds a new coin, refreshes user coins
//   const addUserCoin = (coinSymbol) => {
//     const userId = cookies.user_id;
//     axios.post(`http://localhost:3001/api/coins/add`, {userId, coinSymbol})
//     .then(res => {
//       if (res.data.alert) {
//         return handleAlert(res.data.alert);
//       }
//       const userCoinRes = res.data.userCoins;
//       const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
//       setUserCoins(filteredUserCoins);
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }

//   // deletes a coin, refreshes user coins
//   const deleteUserCoin = (coin) => {
//     const userId = cookies.user_id;
//     axios.post(`http://localhost:3001/api/coins/delete`, {userId, coin})
//     .then(res => {
//       if (res.data.alert) {
//         return handleAlert(res.data.alert);
//       }
//       const userCoinRes = res.data.userCoins;
//       const filteredUserCoins = filterUserCoins(userCoinRes, allCoins);
//       setUserCoins(filteredUserCoins);
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }

//   const loadCoinData = async () => {
//     const userId = cookies.user_id;
//     const coin = coinState.coin.ticker;
//     const uuid = coinState.coin.uuid;
//     const URL = `http://localhost:3001/api/coins/show/${userId}/${coin}/${uuid}/${coinState.candleLength}/${currency.ticker}/${currency.uuid}`

//     try {
//       const res = await axios.get(URL);
//       const {coinInfo, userCoinTrades, userCoinStats} = res.data;
//       setCandles(coinInfo.candles);
//       setCoinInfo(coinInfo.coin);
//       setTrades(userCoinTrades);
//       setUserCoinStats(userCoinStats);
//     } catch (error) {
//       console.log(error)
//     }

//   }

//   const filterUserCoins = (userCoins, allCoins) => {
//     const userCoinArr = [];
//     userCoins.forEach(coin => {
//       for (let c of allCoins) {
//         if (coin.symbol === c.ticker) {
//           userCoinArr.push(c);
//         }
//       }
//     })
//     return userCoinArr
//   }

//   return {
//     setCoin,
//     setCoinInfo,
//     setCandleLength,
//     setCandles,
//     setCurrency,
//     addUserCoin,
//     deleteUserCoin,
//     loadCoinData,
//     filterUserCoins,
//     allCoins,
//     userCoins,
//     currency,
//     coinState,
//     userCoinStats,
//     trades,
//   }
// }