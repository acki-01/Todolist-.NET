import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoaderIndicator from "../../../app/layout/LoaderIndicator";
import { v4 as uuid } from "uuid";
import TextArea from "antd/lib/input/TextArea";
import Card from "antd/lib/card";

function TodoForm() {
  const { todoStore } = useStore();
  const {
    createTodo,
    updateTodo,
    loading,
    loadTodo,
    loadingInitial,
  } = todoStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [todo, setTodo] = useState({
    id: "",
    title: "",
    description: "",
    comment: "",
    category: 1,
    priority: 1,
    created_At: "",
    updated_At: "",
    finish_Time: "",
    done: false,
    user_Id: 0,
  });

  useEffect(() => {
    if (id) {
      loadTodo(id).then((activity) => setTodo(activity!));
    }
  }, [id, loadTodo]);

  function handleSubmit() {
    if (todo.id.length === 0) {
      let newTodo = {
        ...todo,
        id: uuid(),
      };
      createTodo(newTodo).then(() => history.push(`/todos/${newTodo.id}`));
    } else {
      updateTodo(todo).then(() => history.push(`/todos/${todo.id}`));
    }
  }

  function handleInputChange(
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = ev.target;
    setTodo({ ...todo, [name]: value });
  }

  if (loadingInitial) return <LoaderIndicator content={"Loading todo..."} />;
  return (
    <Card>
      <Form onFinish={handleSubmit} autoComplete={"off"}>
        <Form.Item label={"Title"}>
          <Input
            placeholder={"Title"}
            value={todo.title}
            name={"title"}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label={"Description"}>
          <TextArea
            placeholder={"Description"}
            value={todo.description}
            name={"description"}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label={"Category"}>
          <Input
            placeholder={"Category"}
            value={todo.category}
            name={"category"}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label={"Date"}>
          <Input
            placeholder={"Date"}
            type={"date"}
            value={todo.created_At}
            name={"created_At"}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label={"Comment"}>
          <TextArea
            placeholder={"Comment"}
            value={todo.comment}
            name={"comment"}
            onChange={handleInputChange}
          />
        </Form.Item>

        {/*<Form.Checkbox placeholder={"Done"} value={todo.done} name={"done"}/>*/}
        <Form.Item label={"Submit"}>
          <Button htmlType={"submit"} loading={loading} type={"primary"}>
            {"Submit"}
          </Button>
        </Form.Item>
        <Form.Item label={"Cancel"}>
          <Link to={"/todos"}>
            <Button htmlType={"button"}>{"Cancel"}</Button>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default observer(TodoForm);
