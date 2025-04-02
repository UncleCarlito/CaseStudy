import React, { useContext } from "react";
import "../styles/login.css";
import { UseUserContext } from "../UserContext.jsx";
import { useNavigate } from "react-router";

function Login() {
  const userVerification = UseUserContext();
  const nav = useNavigate();
  console.log("login rendered");
  console.log(userVerification.isAuthenticated);

  const userLogin = async (event) => {
    event.preventDefault();
    console.log(event.target.password.value);

    const success = await userVerification.userLogin(
      event.target.email.value,
      event.target.password.value
    );
    if (success) {
      nav("/");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <p>Login</p>
        <form onSubmit={userLogin}>
          <input type="text" id="email" placeholder="Email" name="email" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
          />
          <button type="submit" disabled={userVerification.loading}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
