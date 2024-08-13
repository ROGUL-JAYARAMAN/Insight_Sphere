import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../Stylesheets/SignIn.css";

import LogoIcon from "../Icons/Logo.png";
import sampleImg from "../Images/sample_img.png";
import googleIcon from "../Icons/GoogleSignin.png";
import gitIcon from "../Icons/GitSignin.png";

var SignIn = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPass] = useState("");

  const [emailErrorMessage, setEmailError] = useState("");
  const [passErrorMessage ,setPassError] = useState("");

  const navigate = useNavigate();

  async function Login(event) {
    event.preventDefault();
    const req = await axios
      .post("http://localhost:3001/signin", {
        Email: Email,
        Password: Password,
      })
      .then((res) => {
        if (res.data === "emailError") {
          setEmailError("Email / UserName doesnot Exist, Sigin Up to continue");
        } else if(res.data === "passwordError"){
          setEmailError("");
          setPassError("Incorrect Email or UserName or Password");
        }else if(res.data==="Success"){
          setEmailError("");
          setPassError("");
          localStorage.setItem("user",Email)
          navigate("/Home")
        }
      });
  }
  

  return (
    <div id="login-content">
      <div className="SignIn">
        <div id="logo-title">
          <img src={LogoIcon} alt="Logo" id="Logo"></img>
          <p id="title">Insight Sphere</p>
        </div>
        <p className="login-content" id="content-1">
          Track Your Workflow with Insight Sphere
        </p>
        <div id="sample-img">
          <img src={sampleImg} alt="Task management"></img>
        </div>
      </div>

      <div className="sign-in">
        <p className="signin-cont" id="signin-tit">
          Login
        </p>
        <form className="sigin-form" onSubmit={Login}>
          <label htmlFor="email">Email /  UserName</label>
          <input
            type="text"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <p id="emailAlert">{emailErrorMessage}</p>
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          ></input>
          <p id="passAlert">{passErrorMessage}</p>
          <center>
            <button id="signin-btn">Sign In</button>
          </center>
        </form>

        <hr></hr>

        <div className="other-signin">
          <p id="otherways">Other ways to Sign-In</p>
          <div className="other-sign-icon">
            <div id="google-sgn">
              <img src={googleIcon} alt="Google Icon"></img>
              <p>Sign In with Google</p>
            </div>
            <div id="git-sgn">
              <img src={gitIcon} alt="Git Icon"></img>
              <p>Sign In with Github</p>
            </div>
          </div>

          <hr></hr>

          <div id="sgnup">
            <p id="p1">Don't have an account? </p>
            <Link to="/SignUp" id="p2">
              <p id="p2">Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;