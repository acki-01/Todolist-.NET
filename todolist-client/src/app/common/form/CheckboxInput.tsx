import { Form, Checkbox } from 'semantic-ui-react';

interface Props {
    name: string;
    label?: string;
}

export default function CheckboxInput(props: Props) {
    return (
        <Form.Field>
            <Checkbox label={props.label} name={props.name} />
        </Form.Field>
    );
}
