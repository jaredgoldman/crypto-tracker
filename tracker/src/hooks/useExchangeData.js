import { useState, useEffect } from 'react'
import useApplicationData from "./useApplicationData"
import useUserData from "./useUserData"
import axios from 'axios'

export default function useExchangeData() {
  
   // exchanges offered by ccxt
  const [exchanges, setExchanges] = useState(null)

  const { setTrades } = useApplicationData();
  const { handleAlert, cookies } = useUserData();

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
  }, [cookies.user_id])

  return { addExchange, exchanges } 
}
