import React from "react";
import { useField } from "formik";
import { Typography } from "antd";
import { Select, Form } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}

export default function SelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  console.log(field.value);
  return (
    <Form.Field>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error && (
        <Typography.Paragraph type="danger">{meta.error}</Typography.Paragraph>
      )}
    </Form.Field>
  );
}
