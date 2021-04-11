import React from "react";
import {Grid} from "semantic-ui-react";
import {Todo} from "../../../app/models/todo";
import TodoList from "./TodoList";
import TodoDetails from "../details/TodoDetails";
import TodoForm from "../form/TodoForm";

interface Props {
    todos: Todo[]
    selectedTodo: Todo | undefined
    selectTodo: (id: string) => void
    cancelSelectTodo: () => void
    editMode: boolean
    openForm: (id: string) => void
    closeForm: () => void
    createOrEditTodo: (todo: Todo) => void
    deleteTodo: (id: string) => void
}

export default function TodoDashboard({todos, selectedTodo, cancelSelectTodo, selectTodo, editMode, closeForm, openForm, createOrEditTodo, deleteTodo} : Props) {
    return (
        <Grid>
            <Grid.Column width={'10'}>
                <TodoList todos={todos} selectTodo={selectTodo} deleteTodo={deleteTodo}/>
            </Grid.Column>
            <Grid.Column width={"6"}>
                {selectedTodo && !editMode && <TodoDetails todo={selectedTodo} cancelSelectTodo={cancelSelectTodo} openForm={openForm}/>}
                {editMode && <TodoForm closeForm={closeForm} selectedTodo={selectedTodo} createOrEditTodo={createOrEditTodo}/>}
            </Grid.Column>
        </Grid>
    )
}