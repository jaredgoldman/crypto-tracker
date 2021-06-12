import React from 'react'
import TradeTableRow from "./TradeTableRow"
import "./TradeTable.scss";

export default function TradeTable(props) {

  const tableRows = props.rows.map(row => {
    return <TradeTableRow 
      key={row.id}
      symbol={row.coinSymbol}
      price={row.unitPrice}
      amount={row.amount}
      cost={row.cost}
      exchangeName={row.exchangeName}
      time={row.time}
      orderType={row.orderType}
      side={row.side}
      fee={row.fee}
      currency={row.feeCurrency}
    />
  })
  
  return (
    <div className="trade-table">
      <h2 className="page-title">Trades</h2>
      <table>
        <thead>
          <tr>
            <td>Quote Currency</td>
            <td>Price</td>
            <td>Amount</td>
            <td>Cost</td>
            <td>Exchange Name</td>
            <td>Date</td>
            <td>Order Type</td>
            <td>Order Side</td>
            <td>Fee</td>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}