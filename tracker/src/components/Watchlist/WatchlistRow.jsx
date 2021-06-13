import { useHistory } from "react-router-dom";
import './WatchlistRow.scss'

export default function WatchlistRow(props) {

  const history = useHistory();
  const handleSetCoin = (ticker, uuid) => {
    history.push('/coins');
    props.setCoin({ticker, uuid});
  } 

  const handleDeleteUserCoin = (ticker) => {
    props.deleteUserCoin(ticker);
  } 

  return (

    <tr>
      <td>{props.ticker}</td>
      <td>{props.rank}</td>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td>{props.changePercent}</td>
      <td>{props.volume}</td>
      <td>{props.marketCap}</td>
      <td>
        <a href='/coins' onClick={(e) => {
            e.preventDefault();
            handleSetCoin(props.ticker, props.uuid);
          }
        }>Show Coin</a>
        <button onClick={(e) => {
            e.preventDefault();
            handleDeleteUserCoin(props.ticker)
          }
        }> Remove Coin</button>
        
      </td>
    </tr>

  )
}