import './App.scss';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import Watchlist from './components/Watchlist/Watchlist';
import CoinDash from "./components/CoinDash"
import TradeTable from './components/TradeTable/TradeTable';
import ExchangeDash from "./components/ExchangeDash"

import useUserData from "./hooks/useUserData"
import useExchangeData from "./hooks/useExchangeData"


export default function App() {

  const {    
    handleLogin, 
    handleLogout, 
    handleRegister,
    handleAlert,
    cookies,
    alert
  } = useUserData();

  const { 
    addExchange,
    getAllTrades, 
    exchanges,
    allTrades 
  } = useExchangeData();
  
  const [coin, setCoin] = useState({})
  
  return (
    <main>
      <Router>
        <header>
          <nav>
            <Link className="nav-text" to="/">Crypto-Tracker</Link>
            {!cookies.user_id && 
              <div>
                <Link className="nav-text" to="/login">Login</Link>
                <Link className="nav-text" to="/register">Register</Link>
              </div>
            }
            {cookies.user_id && 
              <div>
                <Link className="nav-text" to="/watchlist">Watchlist</Link>
                <Link className="nav-text" to="/exchange">Exchanges</Link>
                <Link className="nav-text" to="/trades">Trades</Link>
                <Link className="nav-text" to="/logout" onClick={() => handleLogout()}>Logout</Link>
              </div>
            }
          </nav>
        </header>
        <Switch>
          <Route path="/login">
          {cookies.user_id ? <Redirect to="/watchlist" /> :
            <LoginForm handleLogin={handleLogin} alert={alert}/> }
          </Route>
          <Route path="/register">
          {cookies.user_id ? <Redirect to="/watchlist" /> :
            <RegisterForm handleRegister={handleRegister} alert={alert}/> }
          <Route path="/logout">
            <Redirect to="/login"/>
          </Route>
          </Route>
          <Route path="/watchlist">
            <Watchlist 
              handleAlert={handleAlert}
              cookies={cookies}
              alert={alert}
              setCoin={setCoin}
            />
          </Route>
          <Route path="/coins">
            {coin ?
              <CoinDash coin={coin}/>
              :
              <div>loading...</div>
            }
          </Route>
          <Route path="/trades">
            <TradeTable getAllTrades={getAllTrades} rows={allTrades}></TradeTable>
          </Route>
          <Route path="/exchange">
            <ExchangeDash addExchange={addExchange} exchanges={exchanges} alert={alert}/>
          </Route>
          <Route exact path="/">
          {!cookies.user_id ? <Redirect to="/login" /> :
            <h1>home page</h1> }
          </Route>
        </Switch>
      </Router>
    </main>
  )
 
}

