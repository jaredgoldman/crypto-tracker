export default function WatchlistRow(props) {
  return (

    <tr>
      <td><img src={props.coinLogo} alt="logo" /></td>
      <td>{props.ticker}</td>
      <td>{props.rank}</td>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td>{props.changePercent}</td>
      <td>{props.volume}</td>
      <td>{props.marketCap}</td>
      {/* <button>Select Coin</button> */}
    </tr>

  )
}