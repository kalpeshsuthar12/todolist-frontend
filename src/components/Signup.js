import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'

export default function Signup() {

    const navigate = useNavigate();
    const [name , setName] = useState("");
    const [mobile , setMobile] = useState("");
    const [mobileErr , setMobileErr] = useState("");
    const [password , setPassword] = useState("");
    const [passwordErr , setPasswordErr] = useState("");

    //mobile Number Validation
    function mobileHandler(e)
    {
      let item = e.target.value;
      setMobile(item);
      item.length === 10 ? setMobileErr(false) : setMobileErr(true);
    }

    //Password Validation
    function passwordHandler(e)
    {
      let item = e.target.value;
      setPassword(item);
      var regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
      item.length >= 8 ? setPasswordErr(true) : setPasswordErr(false);
      !regularExpression.test(item) ? setPasswordErr(true) : setPasswordErr(false);
    }

    //Signup Form
    const submitHandler = (e) => {
    e.preventDefault();
    if(mobileErr && passwordErr && name.length <= 3)
    {
      alert("Enter Valid Mobile Number and Password");
    }
    else{
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/signup',
        data: {
        name: name,
        mobile: mobile,
        password: password
        },
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then((response) => {
        console.log(response)
        if (response.status === 200) {          
          alert("Successfully Singup")
          navigate('/signin');
        }
        else if (response.status === 203) {
          alert("Warning : User Already Exists")
        }
        else {
          alert("Something Wrong")
        }
    }).catch((response) => console.log('error', response))
    }}  
    

  return (
    <div>
      <div className="back">
        <div className="div-center">
          <div className="content">
            <h3>SignUp</h3>
            <hr />
            <form onSubmit={submitHandler}>
             <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" name="name" onChange={(e)=>setName(e.target.value)} placeholder="Name" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Mobile Number</label>
                <input type="text" className="form-control" name="mobile" onChange={mobileHandler} placeholder="Mobile Number" />
                {(mobileErr) ? <span class="invalid-feedback">Enter Valid Mobile Number 10 Digit</span> : ''}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" name="password" onChange={passwordHandler} placeholder="Password"/>
                {(passwordErr) ? <span class="invalid-feedback">Only Number or alphabetic and no special characters allow</span> : ''}
              </div>
              <button type="submit" className="btn btn-primary mt-2">Signup</button>
              <hr />
              <Link to="/signin" className="btn btn-link">Signin</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
