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
import CoinDash from "./components/CoinDash"

import useApplicationData from "./hooks/useApplicationData"
import Watchlist from './components/Watchlist/Watchlist';

export default function App() {

  const { 
    handleLogin, 
    handleLogout, 
    handleRegister, 
    addUserCoin,
    loadCoinData,
    cookies, 
    alert, 
    allCoins,
    userCoins,
    candles
  } = useApplicationData();

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
          {cookies.user_id ? <Redirect to="/" /> :
            <LoginForm handleLogin={handleLogin} alert={alert}/> }
          </Route>
          <Route path="/register">
            <RegisterForm handleRegister={handleRegister} alert={alert}/>
          </Route>
          <Route path="/watchlist">
            <Watchlist 
              userCoins={userCoins} 
              allCoins={allCoins} 
              addUserCoin={addUserCoin}
              loadCoinData={loadCoinData}
            />
          </Route>
          <Route path="/coins">
            <CoinDash candles={candles}/>
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

