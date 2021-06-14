import { useState, useEffect } from 'react'
import useCoinData from "./useCoinData"
import useUserData from "./useUserData"
import axios from 'axios'

export default function useExchangeData() {
  
   // exchanges offered by ccxt
  const [exchanges, setExchanges] = useState(null);
  const [allTrades, setAllTrades] = useState(null);
  const { setTrades } = useCoinData();
  const { handleAlert, cookies } = useUserData();

  const getAllTrades = async () => {
    const URL = `http://localhost:3001/api/exchange/trades/${cookies.user_id}`
    const res = axios.get(URL);
    if (res.ok) {
      console.log(res.data);
      return setAllTrades(res.data);
    }
    console.log('error getting trades');
  }

  const addExchange = async (exchangeData) => {
    if (!exchangeData.exchangeName || !exchangeData.apiKey || !exchangeData.secretKey) {
      return handleAlert(`please enter valid credentials`)
    }
    const URL = `http://localhost:3001/api/exchange/new`
    try {
      const res = await axios.post(URL, {userId: cookies.user_id, ...exchangeData})
      if (alert) {
        return handleAlert(res.data.alert);
      }
      setTrades(res.data.trades);
      // setBalance(res.data.balance);
    } catch(error) {
      console.log(error)
    }
  }

  const getExchanges = async () => {
    const URL = `http://localhost:3001/api/exchange`
    const resExchanges = await axios.get(URL);
    return resExchanges.data;
  }

  const getExchangeData = async () => {
    try {
      const ccxtExchanges = await getExchanges();
      setExchanges(ccxtExchanges)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (cookies.user_id) {
      getExchangeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.user_id])

  return { addExchange, exchanges, getAllTrades, allTrades } 
}
