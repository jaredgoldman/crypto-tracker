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
      
      <p>Login</p>
      
      <form 
        action="" 
        method="POST" 
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin(userData)
        }
      }>
        <label>Email</label>
        <input 
          className="input-field" 
          type="text" 
          placeholder="enter your email"
          onChange={(e) => {handleEmail(e)}}
        >
        </input>
        <label>Password</label>
        <input 
          className="input-field" 
          type="password" 
          placeholder="enter your password"
          onChange={(e) => {handlePassword(e)}}
        >
        </input>
        <div>
          <input type="submit" className="button"/>
        </div>
      </form>

    </div>
  )
}
