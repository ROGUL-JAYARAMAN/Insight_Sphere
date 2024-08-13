import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LogoIcon from "../Icons/Logo.png";

import "../Stylesheets/SignUp.css";

var SignUp = () => {
  // get values from input fields and set to variable using useState\
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPass] = useState("");
  const [Cpass, setConfirmPass] = useState("");
  const [err_Msg, setErrorMessage] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [usernameCheck , setUserNameCheck]=useState("");
  var navigate = useNavigate();

  useEffect(() => {
    if (Password === Cpass) {
      setErrorMessage("");
    } else {
      setErrorMessage("Password and Confirm Password should match");
    }
  }, [Cpass]);

  useEffect(() => {
    if (Cpass !== "") {
      if (Password === Cpass) {
        setErrorMessage("");
      } else {
        setErrorMessage("Password and Confirm Password should match");
      }
    }
  }, [Password]);

  useEffect(() => {
    const req = axios
      .post("http://localhost:3001/emailcheck", {
        Email: Email
      })
      .then((response) => {
        if (response.data === "emailCheck") {
          setEmailCheck("Email already exists");
        } else if(response.data=="emailAccepted"){
          setEmailCheck("");
        }
      });
  }, [Email]);

  useEffect(() => {
    const req = axios
      .post("http://localhost:3001/usernamecheck", {
        UserName: UserName
      })
      .then((response) => {
        if (response.data === "usernameCheck") {
          setUserNameCheck("UserName already exists");
        } else if(response.data=="usernameAccepted"){
          setUserNameCheck("");
        }
      });
  }, [UserName]);

  async function submit(event) {
    event.preventDefault();
    const req = await axios
      .post("http://localhost:3001/signup", {
        UserName: UserName,
        Email: Email,
        FirstName: FirstName,
        LastName: LastName,
        Password: Password,
      })
      .then((res) => {
        if (res.data === "Success") {
          navigate("/");
        } else if (res.data === "Falied_to_SignUp") {
          setErrorMessage("Failed to SignUp, Check UserName or Email");
        } else {
          setErrorMessage("Failed to SignUp, Please try again");
        }
      });
  }
  return (
    <div id="sgn-up">
      <div className="signup-left">
        <div className="sgnup_logo">
          <img src={LogoIcon} alt="Logo" id="sgnup_Logo"></img>
          <p>Insight Sphere</p>
        </div>
        <div className="sgnup_cont">
          <p>
            Join Insight Sphere to effortlessly manage your tasks and projects.
            Visualize your workflow, collaborate with your team, and boost
            productivity—all in one place. Sign up now and get started!
          </p>
        </div>
      </div>

      <div className="signup-right">
        <div className="create-acc">
          <div id="create-acc">
            <p>Create Your Account</p>
          </div>
          <div id="have-acc">
            <p id="have-acc-p1">Already have an account ? </p>
            <Link to="/" id="have-acc-p2">
              <p id="have-acc-p2">Sign In</p>
            </Link>
          </div>
        </div>
        <form className="signup-form" onSubmit={submit}>
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <p className="errorMessage">{emailCheck}</p>
          <label htmlFor="fn">First Name :</label>
          <input
            type="text"
            id="fn"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></input>
          <label htmlFor="fn">Last Name :</label>
          <input
            type="text"
            id="ln"
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></input>
          <label htmlFor="fn">User Name :</label>
          <input
            type="text"
            id="username"
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input><p className="errorMessage">{usernameCheck}</p>
          <label htmlFor="fn">New Password :</label>
          <input
            type="password"
            id="pass"
            required
            onChange={(e) => {
              setPass(e.target.value);
            }}
          ></input>
          <label htmlFor="fn">Confirm Password :</label>
          <input
            type="password"
            id="cpass"
            required
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
          ></input>{" "}
          <p className="errorMessage">{err_Msg}</p>
          <button type="submit" id="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
