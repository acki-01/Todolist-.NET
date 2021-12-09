import React from 'react';
import { useField } from 'formik';
import { Typography } from 'antd';
import { TextArea } from 'semantic-ui-react';
import { Form } from 'antd';

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

export default function TextAreaInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Item>
            <TextArea {...field} {...props} />
            {meta.touched && meta.error && (
                <Typography.Paragraph type="danger">
                    {meta.error}
                </Typography.Paragraph>
            )}
        </Form.Item>
    );
}
