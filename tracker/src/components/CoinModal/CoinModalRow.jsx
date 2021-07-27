import './CoinModalRow.scss'

export default function CoinModalRow(props) {

  return (

    <tr>
      <td>{props.coin}</td>
      <td>{props.ticker}</td>
      <td>
        <button onClick={() => props.addUserCoin(props.ticker)}>Add Coin</button>
      </td>
    </tr>
  )
}