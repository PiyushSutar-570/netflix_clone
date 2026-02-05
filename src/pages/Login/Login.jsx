import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState,setSignState] = useState("Sign In");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const user_auth = async(event)=>{
    event.preventDefault();
    setLoading(true);
    if(signState==="Sign In"){
      await login(email,password);
    }
    else{
      await signup(name,email,password);
    }
    setLoading(false);
  }

  return (
    loading?
      <div className="login-spinner">
        <img src={netflix_spinner} alt="ha" />
      </div>: 
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState==="Sign Up" && <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Your name' />}
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Your email' />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
          <button type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In" ? <p>New To Netflix?<span onClick={()=>setSignState("Sign Up")}>Sign Up Now</span></p> : <p>Already have account?<span onClick={()=>setSignState("Sign In")}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login

//04587302948cf2e237db52b0dba4b39d

//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDU4NzMwMjk0OGNmMmUyMzdkYjUyYjBkYmE0YjM5ZCIsIm5iZiI6MTczNzExODA5My44NzUsInN1YiI6IjY3OGE1MThkOTNmNzQyY2MyOWFkMTE2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k6WFrGCB0VrGg_HoKtgEB4c-1Hcrr4vLa29zSyvkOsc