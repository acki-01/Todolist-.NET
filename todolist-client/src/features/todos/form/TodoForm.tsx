import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import LoaderIndicator from "../../../app/layout/LoaderIndicator";
import Card from "antd/lib/card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/models/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { Todo } from "../../../app/models/todo";
import { history } from "../../../index";
import { v4 as uuid } from "uuid";

function TodoForm() {
  const { todoStore } = useStore();
  const {
    loading,
    loadTodo,
    loadingInitial,
    createTodo,
    updateTodo,
  } = todoStore;
  const { id } = useParams<{ id: string }>();

  const [todo, setTodo] = useState<Todo>({
    id: "",
    title: "",
    description: "",
    comment: "",
    category: 1,
    priority: 1,
    created_At: null,
    updated_At: null,
    finish_Time: null,
    done: false,
    user_Id: 0,
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The todo title is required"),
    category: Yup.string().required("The todo category is required"),
    finish_Time: Yup.string().required("Date is required").nullable(),
    done: Yup.boolean().required("The todo category is required"),
  });

  useEffect(() => {
    if (id) {
      loadTodo(id).then((activity) => setTodo(activity!));
    }
  }, [id, loadTodo]);

  function handleForSubmit(todo: Todo) {
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
  //
  // function handleInputChange(
  //   ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { name, value } = ev.target;
  //   setTodo({ ...todo, [name]: value });
  // }

  if (loadingInitial) return <LoaderIndicator content={"Loading todo..."} />;
  return (
    <Card>
      <Formik
        initialValues={todo}
        onSubmit={(values) => handleForSubmit(values)}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form onSubmit={handleSubmit} autoComplete={"off"}>
            <TextInput placeholder={"Title"} name={"title"} />

            <TextAreaInput
              rows={3}
              placeholder={"Description"}
              name={"description"}
            />

            <SelectInput
              options={categoryOptions}
              placeholder={"Category"}
              name={"category"}
            />

            <DateInput
              placeholderText={"Finish Time"}
              name={"finish_Time"}
              showTimeSelect
              timeCaption={"time"}
              dateFormat={"MMMM d, yyyy h:mm aa"}
            />

            <TextAreaInput rows={2} placeholder={"Comment"} name={"comment"} />

            {/*<Form.Checkbox placeholder={"Done"} value={todo.done} name={"done"}/>*/}
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              htmlType={"submit"}
              loading={loading}
              type={"primary"}
            >
              {"Submit"}
            </Button>
            <Link to={"/todos"}>
              <Button htmlType={"button"}>{"Cancel"}</Button>
            </Link>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default observer(TodoForm);
