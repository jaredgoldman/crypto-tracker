import "./UserCoinInfo.scss"

export default function UserCoinInfo(props) {
  const { userCoinStats, currency, coin } = props
  const { pL, average, balance } = userCoinStats;

  return (
    <div className="user-coin-stats">
      <h2 className="coindash-heading">Asset Performance</h2>
      <div className="stats">

      {pL &&
        <div className="stat">
          <h3>{'P&L'}</h3>
          <p
            style={parseInt(pL) < 0 ? {color: "red"} : {color: "green"}}
          >{pL.toFixed(2)} %</p>
        </div>
      }

      {average &&
        <div className="stat">
          <h3>Average</h3>
          <p>${average} {currency.ticker}</p>
        </div>
      }

   
        <div className="stat">
          <h3>Balance</h3>
          <p>{balance && balance.balance ? balance.balance : 0} {coin.ticker}</p>
        </div>
      

      </div>

    </div>
    
  )

}