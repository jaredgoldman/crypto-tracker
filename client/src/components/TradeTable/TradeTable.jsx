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
            <th>Quote Currency</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Cost</th>
            <th>Exchange Name</th>
            <th>Date</th>
            <th>Order Type</th>
            <th>Order Side</th>
            <th>Fee</th>
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