import axios from 'axios';
import React,{ useState } from 'react'
import { useDispatch } from "react-redux";
import { addtodo } from '../redux/action/index'

export default function Input() {

  const dispatch = useDispatch();
  const [title, setTitle] = useState(""); //title input
  
  //Add New Todo List Form
  const submitHandler = (e) => {
  e.preventDefault();
  axios({
      method: 'post',
      url: 'http://localhost:5000/api/add-todo',
      data: {
        user: localStorage.getItem("user"),
        title: title,
        completed: false,
      },
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
  }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        dispatch(addtodo( response.data.todo._id, localStorage.getItem("user"), title));
        alert("Successfully Add New Task")
        setTitle("");
      }
  }).catch((response) => console.log('error', response))}

  return (
    <div className="addtask">
        <form onSubmit={submitHandler}>
          <input placeholder="Enter a task..." value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <button type="submit">Add task</button>
        </form>        
    </div>
  )
}
