import React, {ChangeEvent, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {Todo} from "../../../app/models/todo";

interface Props {
    selectedTodo: Todo | undefined
    closeForm: () => void
    createOrEditTodo: (todo: Todo) => void
}

export default function TodoForm({closeForm, selectedTodo, createOrEditTodo}: Props) {
    const initialState = selectedTodo ?? {
        id: '',
        title: '',
        description: '',
        comment: '',
        category: 1,
        priority: 1,
        created_At: '',
        updated_At: '',
        done: false,
        user_Id: 0
    }

    const [todo, setTodo] = useState(initialState)

    function handleSubmit() {
        createOrEditTodo(todo)
    }

    function handleInputChange(ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = ev.target
        setTodo({...todo, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete={'off'}>
                <Form.Input placeholder={"Title"} value={todo.title} name={"title"} onChange={handleInputChange}/>
                <Form.TextArea placeholder={"Description"} value={todo.description} name={"description"} onChange={handleInputChange}/>
                <Form.Input placeholder={"Category"} value={todo.category} name={"category"} onChange={handleInputChange}/>
                <Form.Input placeholder={"Date"} value={todo.created_At} name={"created_At"} onChange={handleInputChange}/>
                <Form.TextArea placeholder={"Comment"} value={todo.comment} name={"comment"} onChange={handleInputChange}/>
                {/*<Form.Checkbox placeholder={"Done"} value={todo.done} name={"done"}/>*/}
                <Button floated={"right"} positive type={"submit"} content={"Submit"}/>
                <Button onClick={closeForm} floated={"right"} type={"button"} content={"Cancel"}/>
            </Form>
        </Segment>
    )
}