import React from "react";
import { Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import { Button, Typography } from "antd";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) =>
            setErrors({ error: "Invalid username or password" })
          )
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form
          className={"ui form"}
          onSubmit={handleSubmit}
          autoComplete={"off"}
        >
          <Typography.Title>Login to Todos</Typography.Title>
          <TextInput placeholder={"Email"} name={"email"} />
          <TextInput
            placeholder={"Password"}
            name={"password"}
            type={"password"}
          />
          <Typography.Paragraph type="danger">
            {errors.error}
          </Typography.Paragraph>
          <Button htmlType="submit" type={"primary"} loading={isSubmitting}>
            {"Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default observer(LoginForm);
