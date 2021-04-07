import React, { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import {Header, List} from "semantic-ui-react";

function App() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/todos').then(response => {
            setTodos(response.data)
        })
    }, [])

  return (
    <div>
        <Header as={"h2"} icon={"users"} content={"Todos"}/>
       <List>
          {todos.map((todo: any) => (
            <List.Item key={todo.id}>
              {todo.title}
            </List.Item>
          ))}
       </List>
    </div>
  );
}

export default App;
