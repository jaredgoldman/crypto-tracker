import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import "./Main.scss"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import Watchlist from './Watchlist/Watchlist';
import CoinDash from "./CoinDash"
import ExchangeDash from "./ExchangeDash"
import HomePage from './HomePage';
import Trades from './Trades'

import useUserData from "../hooks/useUserData"

export default function Main() {
  const [coin, setCoin] = useState({ticker: "BTC", uuid: "Qwsogvtv82FCd", name: "Bitcoin"})
  
  const {    
    handleLogin, 
    handleLogout, 
    handleRegister,
    handleAlert,
    cookies,
    alert
  } = useUserData();
  
  return (
    <main>
      <Router>
        <header>
          <nav>
            <Link className="nav-title" to="/">Crypto-Tracker</Link>
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
        <div className="routes-wrapper">
        <Switch>
          <Route path="/login">
          {cookies.user_id ? <Redirect to="/watchlist" /> :
            <LoginForm handleLogin={handleLogin} alert={alert}/> }
          </Route>
          <Route path="/register">
          {cookies.user_id ? <Redirect to="/watchlist" /> :
            <RegisterForm handleRegister={handleRegister} alert={alert}/> }
          </Route>
          <Route path="/logout">
            <Redirect to="/login"/>
          </Route>
          <Route path="/watchlist">
          {!cookies.user_id ? <Redirect to="/login" /> :
            <Watchlist 
              handleAlert={handleAlert}
              cookies={cookies}
              alert={alert}
              setCoin={setCoin}
            /> }
          </Route>
          <Route path="/coins">
            {coin ?
              <CoinDash coin={coin}/>
              :
              <div>loading...</div>
            }
          </Route>
          <Route path="/trades">
            <Trades />
          </Route>
          <Route path="/exchange">
          {!cookies.user_id ? <Redirect to="/login" /> :
            <ExchangeDash alert={alert}/> }
          </Route> 
          <Route exact path="/">
            <HomePage/> 
          </Route>
        </Switch>
      </div>
    </Router>
  </main>
  )
}