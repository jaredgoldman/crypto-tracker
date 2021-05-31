import './CoinModalRow.scss'

export default function CoinModalRow(props) {

  return (

    <tr>
      <td>{props.coin}</td>
      <td>{props.ticker}</td>
      <td>
        <button>Select Coin</button>
      </td>
    </tr>
  )
}