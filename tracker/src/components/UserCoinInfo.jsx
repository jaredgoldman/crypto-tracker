import "./UserCoinInfo.scss"

export default function UserCoinInfo(props) {
  const { userCoinStats, currency } = props
  const { pL, average} = userCoinStats

  return (
    <div className="user-coin-stats">
      <h2 className="coindash-heading">Asset Performance</h2>

      <div className="stats">
        <div className="stat">
          <h3>{'P&L'}</h3>
          <p
            style={parseInt(pL) < 0 ? {color: "red"} : {color: "green"}}
          >{pL.toFixed(2)} %</p>
        </div>

        <div className="stat">
          <h3>Average</h3>
          <p>${average} {currency.ticker}</p>
        </div>

      </div>

    </div>
    
  )

}