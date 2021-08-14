import './CoinModalRow.scss'

export default function CoinModalRow({
  coin, 
  ticker,
  addUserCoin,
  coinLogo
}) {

  return (

    <tr>
      <td className="image-icon"><img src={coinLogo}/>{coin}</td>
      <td className="coinModalRow__ticker">{ticker}</td>
      <td>
        <button onClick={() => addUserCoin(ticker)}>Add Coin</button>
      </td>
    </tr>
  )
}