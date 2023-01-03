import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Header() {

  const navigate = useNavigate();
  const total = useSelector((state) => state.todoReducer.list); //total todo count
  const incomplete = total.filter(item => item.completed !== false); //incomplete todo count
  const complete = total.filter(item => item.completed !== true); //complete todo count
  const [realTime, setrealTime] = useState(""); 
  const name = localStorage.getItem("username"); //User Name fetch to local Stroage
  const date = new Date().toDateString();
  //real Time clock
  setInterval(function () {
    const time = new Date().toLocaleTimeString();
    setrealTime(time);
  }, 500);

  //Logout
  function logout(){
    localStorage.clear();
    navigate("/signin")
  }

  return (
    <div className="top-part">
      <div className="saturday">
        <h3 className="">Hello <b>{name}</b></h3>
        <h5 className="setdate">{date}</h5>
        <h6 className="settime">{realTime}</h6>
        <p>
          <button type="button" className="logout-btn" onClick={()=>logout()}>Logout</button>
        </p>
      </div>
      <div className="tasks">
        <h6>Total Tasks</h6>
        <p><b>{total.length}</b></p>
      </div>
      <div className="tasks">
        <h6>Incomplete Tasks</h6>
        <p><b>{incomplete.length}</b></p>
      </div>
      <div className="tasks">
        <h6>Complete Tasks</h6>
        <p><b>{complete.length}</b></p>
      </div>
    </div>
  );
}
