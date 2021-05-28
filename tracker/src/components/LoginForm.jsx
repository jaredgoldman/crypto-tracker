import './LoginForm.scss'

export default function LoginForm() {

  return (
    <div className="form-container">
      
      <p>Login</p>
      
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
  )
}
