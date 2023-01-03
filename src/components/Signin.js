import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'

export default function Signin() {

    const navigate = useNavigate();
    const [mobile , setMobile] = useState("");
    const [password , setPassword] = useState("");

    //Signin Form
    const submitHandler = (e) => {
    e.preventDefault();
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/signin',
        data: {
        mobile: mobile,
        password: password,
        },
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then((response) => {
        if (response.status === 200) {
            console.log(response)
            console.log(response.data.user._id)
            let login = localStorage.setItem("user", response.data.user._id);
            localStorage.setItem("username", response.data.user.name);
            if(!login){
                alert("Successfully Login")
                navigate('/')
            }            
        }
        else if(response.status === 203){
            alert("User Not Found!")
        }
        else{
          alert("Somthing Wrong!")
        }
    }).catch((response) => console.log('error', response))}

  return (
    <div>
      <div className="back">
        <div className="div-center">
          <div className="content">
            <h3>Login</h3>
            <hr />
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile Number"
                  name={mobile}
                  onChange={e=>setMobile(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name={password}
                  onChange={e=>setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">Login</button>
              <hr />
              <Link to="/signup" className="btn btn-link">Signup</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
