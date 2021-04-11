import React, { useState, useEffect} from 'react';
import '../../App.css';
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import {Container} from "semantic-ui-react";
import {Todo} from "../models/todo";
import NavBar from "./NavBar";
import TodoDashboard from "../../features/todos/dashboard/TodoDashboard";

function App() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/todos').then(response => {
            setTodos(response.data)
        })
    }, [])

    function handleSelectTodo(id: string) {
        setSelectedTodo(todos.find(x => x.id === id))
    }

    function handleCancelSelectedTodo() {
        setSelectedTodo(undefined)
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectTodo(id) : handleCancelSelectedTodo()
        setEditMode(true)
    }

    function handleFormClose() {
        setEditMode(false)
    }

    function handleCreateOrEditTodo(todo: Todo) {
        todo.id ? setTodos([...todos.filter(x => x.id === todo.id), todo]) : setTodos([...todos, {...todo, id: uuid()}])
        setEditMode(false)
        setSelectedTodo(todo)
    }

    function handleDeleteActivity(id: string) {
        setTodos([...todos.filter(x => x.id !== id)])
    }

  return (
    <>
        <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop: '7em'}}>
            <TodoDashboard
                selectedTodo={selectedTodo}
                cancelSelectTodo={handleCancelSelectedTodo}
                selectTodo={handleSelectTodo}
                todos={todos}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                createOrEditTodo={handleCreateOrEditTodo}
                deleteTodo={handleDeleteActivity}
            />
        </Container>
    </>
  );
}

export default App;
