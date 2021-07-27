import "./TradeTableRow.scss"

export default function TradeTableRow(props) {
  const d = new Date(props.time)
  const date = d.toLocaleString();

  const exchangeName = `${props.exchangeName.slice(0,1).toUpperCase()}${props.exchangeName.slice(1)}`

  return (
      <tr>
        <td className="coin-column">{props.symbol}</td>
        <td>${props.price.toFixed(4)}</td>
        <td>{props.amount.toFixed(4)}</td>
        <td>${props.cost.toFixed(4)}</td>
        <td>{exchangeName}</td>
        <td>{date}</td>
        <td>{props.orderType}</td>
        <td>{props.side}</td>
        <td>{props.fee}</td>
      </tr>
  )
}