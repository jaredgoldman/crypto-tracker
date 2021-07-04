import { useEffect, useState } from 'react'
import axios from "axios"
import UseUserData from '../hooks/useUserData'

import "./UserExchanges.scss"

export default function UserExchanges(props) {
const { exchangeRows } = props

  return (
    <div className="user-exchanges-wrapper">
      {exchangeRows ? 
      <div className="user-exchanges">
        <div className="coindash-heading">
          <h2>Your Exchanges</h2>
        </div>
        <div>
          {exchangeRows}
        </div> 
      </div>
      :
      <div className="no-exchange">
        <h2>You currently have no exchanges. Add an exchange below to get started</h2>
      </div> 
    }
    </div>
      
  )
}