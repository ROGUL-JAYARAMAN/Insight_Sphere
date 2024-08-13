import NavBar from "./NavBar";
import "../Stylesheets/Home.css";
import user from "../Icon/User.png";
import { useEffect, useState } from "react";
import axios from "axios";

var Home = () => {

  var [data,setData]=useState([])

  useEffect(()=>{
    const req=axios 
    .post("http://localhost:3001/getUser",{
       User:localStorage.getItem("user")
    }).then((Response) =>{
      setData(Response.data)
    })
  })

  return (
    <div>
      <NavBar />
      <div className="welcome">
        <div className="User">
          <img src={user} alt="User Image"></img>
        </div>
        <div className="Content">
          <div className="Greet">
            <p> Welcome to Insight Sphere</p>
          </div>
          <div className="Name">
            <p id="fn">{data.FirstName}</p>
            <p id="ln">{data.LastName}</p>
          </div>
          <div className="greetcontent">
          <p> We’re excited to have you on board!
              Insight Sphere is your all-in-one platform for mastering task
              management and project tracking. Designed with simplicity and
              efficiency in mind, our intuitive Kanban board system helps you
              visualize tasks, monitor progress, and stay organized. Whether
              you’re managing a personal project or leading a team, Insight
              Sphere makes it easy to streamline your workflow and achieve your
              goals.
            </p>
            <p> Let’s get started and unlock your productivity potential
                with Insight Sphere!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
