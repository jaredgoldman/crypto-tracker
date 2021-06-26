import './LoginForm.scss'
import { useState } from 'react'

export default function LoginForm(props) {

  const { handleLogin } = props;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const userData = { email, password };

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="form-container">
      {props.alert && <div>{props.alert}</div>}
      <div className="form-heading">
        <p>Login</p>
      </div>
      
      <form 
        action="" 
        method="POST" 
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin(userData)
        }
      }>
        <div className="inputs-wrapper">
          <div className="input-wrapper">
            <label>Email:</label>
            <input 
              className="input-field" 
              type="text" 
              placeholder="enter your email"
              autoComplete="on"
              onChange={(e) => {handleEmail(e)}}
            >
            </input>
          </div>
          <div className="input-wrapper">
            <label>Password:</label>
            <input 
              className="input-field" 
              type="password" 
              placeholder="enter your password"
              autoComplete="on"
              onChange={(e) => {handlePassword(e)}}
            >
            </input>
          </div>
        </div>
        <div className="button-wrapper">
          <input type="submit" className="button"/>
        </div>
      </form>

    </div>
  )
}
