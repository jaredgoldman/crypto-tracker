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

export default function App() {

  return (
    <main>
      <Router>
       <nav>
        <Link className="nav-text" to="/">Crypto-Tracker</Link>
        <Link className="nav-text" to="/login">Login</Link>
        <Link className="nav-text" to="/register">Register</Link>
      </nav>
        <Switch>
          <Route path="/login">
            <LoginForm/>
          </Route>
          <Route path="/register">
            <RegisterForm/>
          </Route>
          <Route exact path="/">
          
          </Route>
        </Switch>
      </Router>
    </main>
  )
 
}

