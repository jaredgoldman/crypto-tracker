import './RegisterForm.scss'

export default function RegisterForm() {

  <div className="form-container">
    
    <p>Register</p>
    
    <form 
      action="" 
      method="POST" 
      onSubmit={(e) => {
        e.preventDefault()
      }
    }>
      <label>Email</label>
      <input className="input-field" type="text" placeholder="enter your email"></input>
      <label>Password</label>
      <input className="input-field" type="password" placeholder="enter your password"></input>

      <div>
        <input type="submit" className="button"/>
      </div>
    </form>

  </div>
}