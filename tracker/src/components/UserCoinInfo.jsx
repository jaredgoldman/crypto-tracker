export default function UserCoinInfo(props) {
  const { pL, average } = props.userCoinStats;

  return (

    <div>
      <h2>User Coin Stats</h2>

      <h3>{'P&L'}</h3>
      <div>{pL}</div>

      <h3>Average</h3>
      <div>{average}</div>

    </div>
    
  )

}