import React from "react";
import {Todo} from "../../../app/models/todo";
import {Card, Image, Button} from "semantic-ui-react";

interface Props {
    todo: Todo
    cancelSelectTodo: () => void
    openForm: (id: string) => void
}

export default function TodoDetails({todo, cancelSelectTodo, openForm}: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${todo.category}.jpg`} />
            <Card.Content>
                <Card.Header>{todo.title}</Card.Header>
                <Card.Meta>
                    <span>{todo.created_At}</span>
                </Card.Meta>
                <Card.Description>
                    {todo.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => openForm(todo.id)} basic color={"blue"} content={"Edit"}/>
                    <Button onClick={cancelSelectTodo} basic color={"blue"} content={"Cancel"}/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}