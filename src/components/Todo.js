import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todolist, updatetodo, deletetodo, completedtodo } from '../redux/action/index'

export default function Todo() {
  
  const [search, setSearch] = useState(""); 
  const dispatch = useDispatch();
  const newlist = useSelector((state) => state.todoReducer.list);
  let user = localStorage.getItem('user');

  //Call API for todolist
  const fetchdata = async () => {    
    let response = await fetch(`http://localhost:5000/api/list/${user}`);
    let JSON = await response.json();
    await dispatch(todolist(JSON.todo));  
  };

  //delete todo item
  const deleteItem = (id) =>{
    axios.delete(`http://localhost:5000/api/delete-todo/${id}`)
    .then((response) => {
      console.log(response)
      alert("Successfully Deleted")
      dispatch(deletetodo(id));
    })
  }
  
  //Update Title for Todo
  const updateTitle = async (id, newtitle) =>{
    let person = await prompt("Please Update Your Todo:", newtitle);
    let title = await person ? person : newtitle;
    await axios({
      method: 'post',
      url: `http://localhost:5000/api/update-todo/${id}`,
      data: {
      title: title,
      completed: false
      },
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      }).then((response) => {
          if (response.status === 200) {
            console.log(response);
            alert("Successfully Update");
            dispatch(updatetodo(id, title));
          }
      }).catch((response) => console.log('error', response))
  }


  //Update Title for Todo
  const updateCompleted = (id, completed) =>{
    let complete = completed ? completed=false : completed=true
    console.log("complete",complete);
    axios({
    method: 'post',
    url: `http://localhost:5000/api/update-todo/${id}`,
    data: {
    completed: complete
    },
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    }).then((response) => {
        if (response.status === 200) {
          console.log(response);
          alert("Successfully Update");
          dispatch(completedtodo(id, complete));      
        }
    }).catch((response) => console.log('error', response))
  }
  
  useEffect(() => {
    fetchdata(fetchdata);    // eslint-disable-next-line
  },[]);

  return (
    <div>
      <div className="addtask">
        <input placeholder="Search a task..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <ul className="added_tasks">
        {
        Array.from(newlist).filter((item) => {   
          if(search)
          {
            return item.title.toLowerCase().includes(search.toLowerCase());
          }     
          return item
        }).map((item) => (
          <li key={item._id} onDoubleClick={()=> updateTitle(item._id, item.title )}>
            <div className="content">
              <span className="tick" onClick={()=>updateCompleted(item._id, item.completed)}><i className={"fa fa-check" + ((item.completed) ? "" : "d-none" )}></i></span>
              <p><strike className={(item.completed ? "" : "strike-none")}>{item.title}</strike></p>
            </div>
            <span onClick={()=>deleteItem(item._id)}><i className="fa fa-trash"></i></span>
          </li>
        ))}        
      </ul>
    </div>
  );
}
