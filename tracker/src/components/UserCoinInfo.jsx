export default function UserCoinInfo(props) {
  const { userCoinStats, currency } = props
  const { pL, average} = userCoinStats
  return (

    <div>
      <h2>User Coin Stats</h2>

      <h3>{'P&L'}</h3>
      <div>{pL.toFixed(2)} %</div>

      <h3>Average</h3>
      <div>${average} {currency.ticker}</div>

    </div>
    
  )

}