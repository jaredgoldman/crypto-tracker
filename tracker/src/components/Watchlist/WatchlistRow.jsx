import { useHistory } from "react-router-dom";
import './WatchlistRow.scss'

export default function WatchlistRow({
  ticker,
  uuid,
  rank, 
  name, 
  price, 
  changePercent, 
  volume, 
  marketCap,
  deleteUserCoin,
  coinLogo,
  setCoin
}) {

  console.log(coinLogo);
  const history = useHistory();

  const handleSetCoin = async (ticker, uuid, name) => {
    setCoin({ticker, uuid, name})
    history.push('/coins')
  } 
  
  const handleDeleteUserCoin = (ticker) => {
    deleteUserCoin(ticker);
  } 
  
  return (

    <tr className="watchlist-row">
      <td>#{rank}</td>
      <td className="image-icon">
        <img src={coinLogo} alt="" />
        <a 
        className="button" 
        href='/coins' 
        onClick={(e) => {
            e.preventDefault();
            handleSetCoin(ticker, uuid, name);
          }}
        >{ticker}
        </a>
      </td>
      <td>{name}</td>
      <td>${Number(price).toFixed(4)}</td>
      <td>{Number(changePercent).toFixed(2)}%</td>
      <td>{`${Number(volume).toFixed(0)} ${ticker}`}</td>
      <td>{`${Number(marketCap).toFixed(0)} ${ticker}`}</td>
      <td>
        
        <button className="button" onClick={(e) => {
            e.preventDefault();
            handleDeleteUserCoin(ticker)
          }
        }> Remove Coin</button>

      </td>
    </tr>

  )
}