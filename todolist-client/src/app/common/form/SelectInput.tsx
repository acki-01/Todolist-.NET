import React from "react";
import { useField } from "formik";
import { Form, Typography } from "antd";
import { Select } from "antd";

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}

export default function SelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Item>
      <label>{props.label}</label>
      <Select
        allowClear
        options={props.options}
        value={field.value || null}
        onChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error && (
        <Typography.Paragraph type="danger">{meta.error}</Typography.Paragraph>
      )}
    </Form.Item>
  );
}
