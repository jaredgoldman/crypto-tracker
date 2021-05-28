import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

export default function Nav() {

  <Router>
    <nav>
      <Link className="nav-text" to="/">Crypto-Tracker</Link>
      <Link className="nav-text" to="/login">Login</Link>
      <Link className="nav-text" to="/register">Register</Link>
    </nav>
  </Router>
  
}