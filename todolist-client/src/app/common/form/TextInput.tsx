import React from 'react';
import { useField } from 'formik';
import { Typography } from 'antd';
import { Input, Form } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}

export default function TextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field>
            <label>{props.label}</label>
            <Input {...field} {...props} />
            {meta.touched && meta.error && (
                <Typography.Paragraph type="danger">
                    {meta.error}
                </Typography.Paragraph>
            )}
        </Form.Field>
    );
}
