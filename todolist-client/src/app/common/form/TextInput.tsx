import React from "react";
import { useField } from "formik";
import { Form, Typography } from "antd";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

export default function TextInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Item>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error && (
        <Typography.Paragraph type="danger">{meta.error}</Typography.Paragraph>
      )}
    </Form.Item>
  );
}
