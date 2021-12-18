import React from 'react';
import { Alert } from 'antd';

interface Props {
    errors: any;
}

export default function ValidationErrors({ errors }: Props) {
    return <Alert message={errors.join(',')} type={'error'} />;
}
