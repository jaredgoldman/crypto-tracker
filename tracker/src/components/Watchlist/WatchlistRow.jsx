import { useHistory } from "react-router-dom";
import './WatchlistRow.scss'

export default function WatchlistRow(props) {

  const history = useHistory();
  const handleClick = (ticker) => {
    history.push('/coins');
    props.setCoin(ticker);
  } 

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
      <td>
        <a href='/coins' onClick={(e) => {
            e.preventDefault();
            handleClick(props.ticker);
          }
        }>Show Coin</a>
      </td>
    </tr>

  )
}