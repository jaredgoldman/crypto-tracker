import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"

import useApplicationData from "./hooks/useApplicationData"
import Watchlist from './components/Watchlist/Watchlist';

const coinArray = [
  {
    coinLogo: "http://cdn.coinranking.com/Sy33Krudb/btc.svg",
    ticker: "BTC",
    rank: 1,
    name: "Bitcoin",
    price: "9370.9993109108",
    changePercent: "-0.52",
    volume: "6818750000",
    marketCap: "159393904304"
  }
]

export default function App() {

  const { handleLogin, handleLogout, handleRegister, cookies, alert } = useApplicationData();

  return (
    <main>
      <Router>
        <header>
          <nav>
            <Link className="nav-text" to="/">Crypto-Tracker</Link>
            {!cookies.user_id && <Link className="nav-text" to="/login">Login</Link>}
            {!cookies.user_id && <Link className="nav-text" to="/register">Register</Link>}
            {cookies.user_id && <Link className="nav-text" to="/watchlist">Watchlist</Link>}
            {cookies.user_id && <Link className="nav-text" to="/logout" onClick={() => handleLogout()}>Logout</Link>}
          </nav>
        </header>
        <Switch>
          <Route path="/login">
          {cookies.user_id ? <Redirect to="/watchlist" /> :
            <LoginForm handleLogin={handleLogin} alert={alert}/> }
          </Route>
          <Route path="/register">
            <RegisterForm handleRegister={handleRegister} alert={alert}/>
          </Route>
          <Route path="/watchlist">
            <Watchlist rows={coinArray}/>
          </Route>
          <Route exact path="/">
          {!cookies.user_id ? <Redirect to="/login" /> :
            <div>home page</div> }
          </Route>
        </Switch>
      </Router>
    </main>
  )
 
}

