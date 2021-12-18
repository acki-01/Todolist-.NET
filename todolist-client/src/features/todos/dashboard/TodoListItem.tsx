import { MouseEvent } from 'react';
import { Button, Card, Tag, List, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import { TodoWithParticipants } from '../../../app/models/todo';
import {
    CheckSquareOutlined,
    CloseSquareOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';

interface Props {
    todo: TodoWithParticipants;
}

type priorityTypes = {
    [key: number]: {
        color: string;
        name: string;
    };
};

const priorities: priorityTypes = {
    1: {
        color: 'green',
        name: 'Low',
    },
    2: {
        color: 'lime',
        name: 'Normal',
    },
    3: {
        color: 'volcano',
        name: 'High',
    },
};

function TodoListItem({ todo }: Props) {
    const { todoStore } = useStore();
    const { deleteTodo } = todoStore;
    const history = useHistory();
    return (
        <List.Item key={todo.id}>
            <Card
                loading={Boolean(!todo)}
                onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    history.push(`/todos/${todo.id}`);
                }}
                style={{ width: '100%' }}
                hoverable
                title={
                    <div
                        style={{
                            display: 'flex',
                            width: '200px',
                            justifyContent: 'space-between',
                        }}
                    >
                        {todo.done ? (
                            <CheckSquareOutlined style={{ fontSize: '24px' }} />
                        ) : (
                            <CloseSquareOutlined style={{ fontSize: '24px' }} />
                        )}
                        <span style={{ margin: 0, display: 'inline' }}>
                            {todo.title}
                        </span>
                    </div>
                }
                extra={
                    <Card.Meta
                        description={
                            <Tag color={priorities[todo.priority.type].color}>
                                {priorities[todo.priority.type].name}
                            </Tag>
                        }
                    />
                }
            >
                <Typography.Paragraph>
                    {/* <Typography.Paragraph>
                        <Typography.Text type="secondary">
                            {'Description:'}
                        </Typography.Text>
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        {todo.description}
                    </Typography.Paragraph> */}
                    <Tag color={'geekblue'}>{todo.category.type}</Tag>
                </Typography.Paragraph>
                {/* <Divider /> */}
                {/* <Comment content={todo.comment} /> */}
                {/* <Divider /> */}
                {/* <Typography.Paragraph>
                    <TodoParticipantsList participants={todo.participants!} />
                </Typography.Paragraph> */}
                {/* <Divider /> */}
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginTop: '40px',
                    }}
                >
                    <Tag color={'blue'}>
                        {todo.isOwner ? 'You are the owner' : todo.ownerName}
                    </Tag>
                    <Button
                        disabled={!todo.isOwner}
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteTodo(todo.id);
                        }}
                        danger
                        size={'small'}
                        icon={<DeleteOutlined />}
                    >
                        {'Delete'}
                    </Button>
                </div>
            </Card>
        </List.Item>
    );
}

export default observer(TodoListItem);
