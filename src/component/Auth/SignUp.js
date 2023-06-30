import React, { useContext,useState } from 'react'
import '../css/login.css'
import GoogleUserLogin from './GoogleLogin'
import ContextMain from '../../context/ContextMain'
import {authenticationRequest} from "../../server/server"
export default function SignUp() {
  const context = useContext(ContextMain)
  const [getName, setName] = useState("")
  const [getEmail, setEmail] = useState("")
  const [getPassword, setPassword] = useState("")
  const handleSignUp = async (event) => {
    // event.target.preventDefault();
    context.setLoading(true)
    try {

      let body = { email: getEmail, password: getPassword, name: getName }
      let res = await authenticationRequest("/signup", body);
      if (res) {
        context.setError({ msg: res, type: "warning", status: true });
      }
      else {
        context.fetchUser()
        context.setError({ msg: "SignUp Success Fully", type: "success", status: true });
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
      <h2>Sign Up</h2>
      {/* <form  onSubmit={handleSignUp}> */}
        <div class="form-group">
          <label for="email">User Name</label>
          <input type="text" id="username" name="username" value={getName} onChange={(event) => { setName(event.currentTarget.value) }} required />
        </div>
        <div class="form-group">
          <label for="email">Email ID:</label>
          <input type="email" id="email" name="email" required value={getEmail} onChange={(event) => { setEmail(event.currentTarget.value) }} />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required value={getPassword} onChange={(event) => { setPassword(event.currentTarget.value) }} />
        </div>
        <div class="form-group">
          <button type="submit" onClick={handleSignUp} class="login-button">Sign Up</button>
        </div>
      {/* </form> */}
      <div class="login-with-gmail">
        <GoogleUserLogin text="Sign Up Using Gmail" />
      </div>
    </div>

  )
}
