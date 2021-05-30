import './RegisterForm.scss'
import { useState } from 'react'



export default function RegisterForm(props) {
  
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

    <div className="form-container">
      {props.alert && <div>{props.alert}</div>}
      <p>Register</p>
      
      <form 
        action="" 
        method="POST" 
        onSubmit={(e) => {
          e.preventDefault()
          props.handleRegister(userData)
        }
      }>
        <label>First Name</label>
        <input 
          className="input-field" 
          type="text" 
          placeholder="enter your first name"
          onChange={(e) => handleFirstName(e)}
        >
        </input>
        <label>Last Name</label>
        <input 
          className="input-field" 
          type="text" 
          placeholder="enter your last name"
          onChange={(e) => handleLastName(e)}
        >
        </input>
        <label>Email</label>
        <input 
          className="input-field" 
          type="text" 
          placeholder="enter your email"
          onChange={(e) => handleEmail(e)}
        >
        </input>
        <label>Password</label>
        <input 
          className="input-field" 
          type="password" 
          placeholder="enter your password"
          onChange={(e) => handlePassword(e)}
        > 
        </input>
        <div>
          <input type="submit" className="button"/>
        </div>
      </form>

    </div>
  )
}