// import { useState, useEffect } from 'react'
// import axios from 'axios'

// import useUserData from './useUserData'
// import useCoinData from './useCoinData'
// import useExchangeData from './useExchangeData'

// export default function useDefaultsActions() {

// const [allCoins, setAllCoins] = useState(null);
// const [userCoins, setUserCoins] = useState(null);

// const { cookies } = useUserData();
// const { getExchangeData } = useExchangeData();
// const { filterUserCoins } = useCoinData();

// const { 
//   loadCoinData, 
//   coinState 
// } = useCoinData();

// useEffect(() => {
//   if (cookies.user_id) {
//     loadDefaultData();
//   }
// }, [cookies.user_id])

// // Load coin data for coin dashboard
// useEffect( () => {
//   if (coinState.coin || coinState.candleLength) {
//     loadCoinData();
//     getExchangeData(); 
//   }
// }, [coinState.coin, coinState.candleLength])

// const loadDefaultData = async () => {
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

//   return { loadDefaultData, allCoins, userCoins, setUserCoins }
// }