import { useEffect, useState } from 'react'
import axios from "axios"
import UseUserData from '../hooks/useUserData'

import "./UserExchanges.scss"

export default function UserExchanges(props) {
const { exchangeAddDelete, setExchangeAddDelete, alert, handleAlert } = props
const { cookies } = UseUserData();
const [exchangeRows, setExchangeRows] = useState([]);

  useEffect(() => {
      loadExchanges();
  },[exchangeAddDelete] )

  const loadExchanges = async () => {
    const URL = `http://localhost:3004/api/exchange/user/exchanges/${cookies.user_id}`
    const res = await axios.get(URL)
    const exchangeRows = userExchangeRows(res.data);
    setExchangeRows(exchangeRows)
  }

  const deleteExchange = async (accountId) => {
    const URL = `http://localhost:3004/api/exchange/user/exchanges`
    try {
      const res = axios.post(URL, {userId: cookies.user_id, accountId});
      setExchangeAddDelete(true);
      handleAlert("deleted exchange")
      setExchangeAddDelete(false);
    } catch(error) {
      console.log(error);
    }

  }

  // const exchanges = ['kraken', 'phemex', 'binance', 'kucoin']
  const userExchangeRows = (exchanges) => {
    const exchangeRows = exchanges.map((exchange, i) => {
      if (exchange.active) {
        const {exchangeName, accountName, accountId} = exchange;
        const formattedName = exchangeName[0].toUpperCase() + exchangeName.slice(1)
    
        return (
          <div key={i} className="user-exchange">
            <p className="account-name"><b>Account name:</b> {accountName}</p>
            <p className="exchange-name"><b>Exchange:</b> {formattedName}</p>
            <button
            onClick={() => {
              deleteExchange(accountId);
            }}
            >{`Disconnect ${formattedName} account`}</button>
          </div>
        )
      }
    })
    if (!exchangeRows[0]) return null
    else return exchangeRows;
  }

  return (
    <div className="user-exchanges">
      <div className="coindash-heading">
        <h2>Your Exchanges</h2>
      </div>
      {exchangeRows ? 
      <div>
        {exchangeRows}
      </div> 
      :
      <div className="no-exchange">
        <h2>You currently have no exchanges</h2>
      </div> 
    }
      
    </div>
  )
}