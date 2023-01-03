import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Header from "./components/Header";
import Input from "./components/Input";
import Todo from "./components/Todo";

export default function Main() {

  //Protected Routes
  const navigate = useNavigate();
  useEffect(()=>{
    let login = localStorage.getItem('user');
    if(!login){
        navigate('signin')
    }
  })
  return (
    <div className="container">
      <div className="card">
        <Header></Header>
        <Input></Input>
        <Todo></Todo>
      </div>
    </div>
  )
}
