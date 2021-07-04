import { useEffect, useState } from 'react'
import axios from 'axios'

import './Trades.scss'

import TradeTable from './TradeTable/TradeTable'

import useUserData from "../hooks/useUserData"

export default function Trades() {
  const [trades, setTrades] = useState([])
  const { cookies } = useUserData();

  const loadTrades = async () => {
    const URL = `http://localhost:3004/api/exchange/trades/${cookies.user_id}`
    
    let trades
    try {
      const res = await axios.get(URL)
      console.log(res.data)
      setTrades(res.data)
    } catch(error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    loadTrades()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (trades && !trades.length) {
    return (
      <div className="no-trades">
        <h2>Please <a href="exchange">connect an exchange</a> to see trades</h2>
      </div>
    )
  }

  return (
    <div className="trades-wrapper">
      <h1 className="coindash-heading">Your Trades</h1>
      <div className="table-wrapper">
        <TradeTable rows={trades} />
      </div>
    </div>
  )

}