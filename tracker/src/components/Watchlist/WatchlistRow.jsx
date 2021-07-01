import { useHistory } from "react-router-dom";
import './WatchlistRow.scss'

export default function WatchlistRow(props) {
  const {
    ticker,
    uuid,
    rank, 
    name, 
    price, 
    changePercent, 
    volume, 
    marketCap,
    deleteUserCoin
  } = props;

  const history = useHistory();
  const { setCoin } = props

  const handleSetCoin = async (ticker, uuid, name) => {
    setCoin({ticker, uuid, name})
    history.push('/coins')
  } 
  
  const handleDeleteUserCoin = (ticker) => {
    deleteUserCoin(ticker);
  } 
  
  return (

    <tr>
      <td>{ticker}</td>
      <td>#{rank}</td>
      <td>{name}</td>
      <td>${Number(price).toFixed(4)}</td>
      <td>{Number(changePercent).toFixed(2)}%</td>
      <td>{`${Number(volume).toFixed(0)} ${ticker}`}</td>
      <td>{`${Number(marketCap).toFixed(0)} ${ticker}`}</td>
      <td>

        <a href='/coins' onClick={(e) => {
            e.preventDefault();
            handleSetCoin(ticker, uuid, name);
          }
        }>Show Coin</a>

        <button onClick={(e) => {
            e.preventDefault();
            handleDeleteUserCoin(ticker)
          }
        }> Remove Coin</button>

      </td>
    </tr>

  )
}