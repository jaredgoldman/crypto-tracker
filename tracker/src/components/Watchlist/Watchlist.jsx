import "./Watchlist.scss"
import WatchlistRow from "./WatchlistRow"

export default function Watchlist(props) {

  const tableRows = props.rows.map((row, i) => {
    return <WatchlistRow
      key={i}
      coinLogo={row.iconUrl}
      ticker={row.ticker}
      rank={row.rank}
      name={row.name}
      price={row.price}
      changePercent={row.changePercent}
      volume={row.volume}
      marketCap={row.marketCap}
    />
  })

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <td>Icon</td>
            <td>Ticker</td>
            <td>Rank</td>
            <td>Name</td>
            <td>Price</td>
            <td>24h%</td>
            <td>Volume (24h)</td>
            <td>Market Cap</td>
          </tr>
        </thead>
        <tbody className="tbody">
          {tableRows}
        </tbody>
      </table>
    </div>
  )

}