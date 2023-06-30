import React, { useContext } from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import ContextMain from "../../context/ContextMain";
import { authenticationRequest,CLIENT_ID } from "../../server/server";

export default function GoogleUserLogin(props) {
  const context = useContext(ContextMain)
  const handleSuccess = async (response) => {
    context.setLoading(true)
    try {
      let body = { "gmail": true, token: response.credential }
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
  const handleFailure = (error) => {
    context.setError({ msg: error.message, type: "error", status: true });
  }
  return (
    <div >

      <GoogleOAuthProvider clientId={CLIENT_ID} >
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
          width="360px"
          text={props.text}
          size="large"
          shape="square"
        />
      </GoogleOAuthProvider>
    </div>
  )
}
