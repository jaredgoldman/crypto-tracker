import "./TradeTableRow.scss"

export default function TradeTableRow(props) {
  const d = new Date(props.time)
  const date = d.toLocaleString();

  return (
      <tr>
        <td className="coin-column">{props.symbol}</td>
        <td>${props.price.toFixed(4)}</td>
        <td>{props.amount.toFixed(4)}</td>
        <td>${props.cost.toFixed(4)}</td>
        <td>{date}</td>
        <td>{props.orderType}</td>
        <td>{props.side}</td>
        <td>{props.fee}</td>
      </tr>
  )
}