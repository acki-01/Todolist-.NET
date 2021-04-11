import React from "react";
import {Item, Segment, Button, Label} from "semantic-ui-react";
import {Todo} from "../../../app/models/todo";

interface Props {
    todos: Todo[]
    selectTodo: (id: string) => void
    deleteTodo: (id: string) => void
}

export default function TodoList({todos, selectTodo, deleteTodo} : Props) {
    console.log({todos})
    return (
        <Segment>
            <Item.Group divided>
                {todos.map((todo: any) => (
                    <Item key={todo.id}>
                        <Item.Content>
                            <Item.Header as={"a"}>{todo.title}</Item.Header>
                            <Item.Meta>{todo.created_At}</Item.Meta>
                            <Item.Meta>{todo.priority}</Item.Meta>
                            <Item.Description>
                                <p>{todo.description}</p>
                                <p>{todo.comment}</p>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectTodo(todo.id)} floated={"right"} content={"View"} color={"blue"} />
                                <Button onClick={() => deleteTodo(todo.id)} floated={"right"} content={"Delete"} color={"red"} />
                                <Label basic content={todo.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    )
}