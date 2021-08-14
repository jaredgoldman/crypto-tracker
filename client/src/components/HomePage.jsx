import './HomePage.scss'
import { 
  CurrencyBitcoin,
  CurrencyDollar, 
  CurrencyExchange,
  
  Speedometer,
  CalendarRangeFill,
  ClockHistory,

  Bank2,
  Safe2,
  GraphUp

} from 'react-bootstrap-icons'

export default function HomePage() {

  return (
    <div className="homepage-wrapper">
      <div className="main-heading">
        <h1>Welcome To Crypto-Tracker</h1>
        <div className="homepage-icons">
          <CurrencyBitcoin />
          <CurrencyDollar />
          <CurrencyExchange />
        </div>
      </div>
      <div className="module-one">
        <p>Track all your coins, all the time</p>
        <div className="homepage-icons">
          <Speedometer />
          <CalendarRangeFill />
          <ClockHistory />
        </div>
      </div>
      <div className="module-two">
        <p>Connect exchanges and get coin stats</p>
        <div className="homepage-icons">
          <Bank2/>
          <Safe2/>
          <GraphUp/>
        </div>
      </div>
    </div>
  )
}