import { observer } from 'mobx-react-lite';
import React from 'react';
import { TodoWithParticipants } from '../../../app/models/todo';
import { Card, Divider, Row, Space, Tag, Typography, Comment } from 'antd';
import {
    ClockCircleOutlined,
    CommentOutlined,
    InfoOutlined,
    MenuUnfoldOutlined,
    StarOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';
import TodoParticipantsList from '../dashboard/TodoParticipantsList';

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

interface Props {
    todo: TodoWithParticipants;
}

function TodoDetailedInfo({ todo }: Props) {
    return (
        <Card>
            <Row>
                <Space size={'large'}>
                    <InfoOutlined />
                    <span>{todo.description}</span>
                </Space>
            </Row>
            <Divider />
            <Row>
                <Space size={'large'}>
                    <StarOutlined />
                    <Tag color={priorities[todo.priority.type].color}>
                        {priorities[todo.priority.type].name}
                    </Tag>
                </Space>
            </Row>
            <Divider />

            <Row>
                <Space size={'large'}>
                    <ClockCircleOutlined style={{ marginRight: '10px' }} />
                    <span>
                        {format(todo.finish_Time!, 'dd MMM yyyy h:mm aa')}
                    </span>
                </Space>
            </Row>
            <Divider />
            <Row>
                <Space size={'large'}>
                    <MenuUnfoldOutlined />
                    <Tag color={'geekblue'}>{todo.category.type}</Tag>
                </Space>
            </Row>
            <Divider />
            <Row>
                <Space size={'large'}>
                    <CommentOutlined />
                    <Comment content={todo.comment} />
                </Space>
            </Row>
            <Divider />
            <Row>
                <Space size={'large'}>
                    <UserOutlined />
                    <TodoParticipantsList participants={todo.participants!} />
                </Space>
            </Row>
        </Card>
    );
}

export default observer(TodoDetailedInfo);
