import React from "react";
import { Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import { Button, Typography } from "antd";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        displayName: "",
        userName: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className={"ui form error"}
          onSubmit={handleSubmit}
          autoComplete={"off"}
        >
          <Typography.Title>Sign up to Todos</Typography.Title>
          <TextInput placeholder={"Email"} name={"email"} />
          <TextInput placeholder={"Display Name"} name={"displayName"} />
          <TextInput placeholder={"username"} name={"userName"} />
          <TextInput
            placeholder={"Password"}
            name={"password"}
            type={"password"}
          />
          {errors.error && <ValidationErrors errors={errors.error} />}
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            htmlType="submit"
            type={"primary"}
            loading={isSubmitting}
          >
            {"Register"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);
