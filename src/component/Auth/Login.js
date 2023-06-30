import React, { useContext, useState } from 'react'
import '../css/login.css'
import GoogleUserLogin from './GoogleLogin'
import ContextMain from '../../context/ContextMain'
import {authenticationRequest} from "../../server/server"
export default function Login() {
  const context = useContext(ContextMain)
  const [getEmail, setEmail] = useState("")
  const [getPassword, setPassword] = useState("")
  const handleLogin = async (event) => {
    // event.target.preventDefault();
    context.setLoading(true)
    try {

      let body = { "gmail": false, email: getEmail, password: getPassword }
      let res = await authenticationRequest("/login", body);
      if (res) {
        context.setError({ msg: res, type: "warning", status: true });
      }
      else {
        context.fetchUser()
        context.setError({ msg: "Login Success Fully", type: "success", status: true });
        context.setDialog({ status: false });
      }
    }
    catch (e) {
      context.setError({ msg: "Server Error....", type: "error", status: true });
    }
    context.setLoading(false)
  }
  return (
    <div class="login-card">
      <h2>Login</h2>
      {/* <form onSubmit={handleLogin}> */}
        <div class="form-group">
          <label for="email">Email ID:</label>
          <input type="email" id="email" value={getEmail} name="email" required onChange={(event) => { setEmail(event.currentTarget.value) }} />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" value={getPassword} name="password" required onChange={(event) => { setPassword(event.currentTarget.value) }} />
        </div>
        {/* <div class="form-group">
        <a href="#" class="forgot-password">Forgot Password?</a>
      </div> */}
        <div class="form-group">
          <button type="submit" onClick={handleLogin} class="login-button">Login</button>
        </div>
      {/* </form> */}
      <div class="login-with-gmail">
        <GoogleUserLogin text="Sign In Using Gmail" />
      </div>
    </div>

  )
}
