import { useState, useEffect} from "react";
import "./UserExchanges.scss"

export default function UserExchanges(props) {
const { userExchanges, deleteExchange } = props;
const [exchangeRows, setExchangeRows] = useState(null)

  useEffect(() => {
    setUserExchangeRows();
  }, [userExchanges])

  const setUserExchangeRows = () => {
    if (userExchanges && userExchanges.length) {
      const exchangeRows = userExchanges.map((exchange, i) => {
        if (exchange.active) {
          const {exchangeName, accountName, accountId} = exchange;
          const formattedName = exchangeName[0].toUpperCase() + exchangeName.slice(1)
      
          return (
            <div key={i} className="user-exchange">
              <p className="account-name"><b>Account name<br /></b> {accountName}</p>
              <p className="exchange-name"><b>Exchange<br /></b> {formattedName}</p>
              <button
              className="delete-exchange-button"
              onClick={() => {
                deleteExchange(accountId);
              }}
              >{`Disconnect ${formattedName} account`}</button>
            </div>
          )
        }
      })
      return setExchangeRows(exchangeRows);
    }
  }
  
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
        <h2>You currently have no connected exchanges. Add an exchange below to get started</h2>
      </div> 
    }
    </div>
      
  )
}