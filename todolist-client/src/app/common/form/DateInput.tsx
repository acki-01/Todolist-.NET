import React from "react";
import { useField } from "formik";
import { Form, Typography } from "antd";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

export default function DateInput(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <Form.Item>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error && (
        <Typography.Paragraph type="danger">{meta.error}</Typography.Paragraph>
      )}
    </Form.Item>
  );
}
