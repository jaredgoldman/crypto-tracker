import './Form.scss'
import { useState } from 'react'

export default function RegisterForm(props) {
  
  const { alert, handleRegister } = props
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const userData = { firstName, lastName, email, password };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  }
  
  const handleLastName = (e) => {
    setLastName(e.target.value);
  }
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="login-register-wrapper">
      {alert && <div>{alert}</div>}

      <div className="form-container">
        <p className="form-heading">Register</p>
        
        <form 
          action="" 
          method="POST" 
          onSubmit={(e) => {
            e.preventDefault()
            handleRegister(userData)
          }
        }>
          <div className="inputs-wrapper">
            <div className="input-wrapper">
              <label>First Name</label>
              <input 
                className="input-field" 
                type="text" 
                placeholder="enter your first name"
                onChange={(e) => handleFirstName(e)}
              >
              </input>
            </div>
            <div className="input-wrapper">
              <label>Last Name</label>
              <input 
                className="input-field" 
                type="text" 
                placeholder="enter your last name"
                onChange={(e) => handleLastName(e)}
              >
              </input>
            </div>
            <div className="input-wrapper">
              <label>Email</label>
              <input 
                className="input-field" 
                type="text" 
                placeholder="enter your email"
                onChange={(e) => handleEmail(e)}
              >
              </input>
            </div>
            <div className="input-wrapper">
              <label>Password</label>
              <input 
                className="input-field" 
                type="password" 
                placeholder="enter your password"
                onChange={(e) => handlePassword(e)}
              > 
              </input>
            </div>
          </div>
          <div className="button-wrapper">
            <input type="submit" className="button"/>
          </div>
        </form>

      </div>
    </div>
  )
}