import React from 'react'
import TradeTableRow from "./TradeTableRow"
import "./TradeTable.scss";
import { useEffect } from 'react';

export default function TradeTable(props) {
const { rows } = props

  useEffect(() => {
    if (props.getAllTrades) {
      props.getAllTrades();
    }
  }, [props])

  return (
    <div className="trade-table">
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
        {rows &&
          <tbody>
          {rows.map(row => {
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
          />}).reverse()}
        </tbody> }
      </table>
    </div>
  )
}