import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Image, Card, Typography } from 'antd';
import { TodoWithParticipants } from '../../../app/models/todo';
import { Link } from 'react-router-dom';
import {
    CheckSquareOutlined,
    CloseSquareOutlined,
    UserAddOutlined,
} from '@ant-design/icons';

const activityImageStyle = {
    filter: 'brightness(30%)',
    height: '300px',
};

interface Props {
    todo: TodoWithParticipants;
}

function TodoDetailedHeader({ todo }: Props) {
    return (
        <Card
            style={{ padding: '24px' }}
            cover={
                <Image
                    style={activityImageStyle}
                    src={`/assets/categoryImages/${todo.category.type}.jpg`}
                />
            }
            title={
                <>
                    {todo.done ? (
                        <CheckSquareOutlined style={{ fontSize: '24px' }} />
                    ) : (
                        <CloseSquareOutlined style={{ fontSize: '24px' }} />
                    )}
                    <Typography.Title>{todo.title}</Typography.Title>
                    <Typography.Paragraph>
                        Owned by{' '}
                        <strong>
                            <Link to={`/profiles/${todo.owner?.userName}`}>
                                {todo.owner?.displayName}
                            </Link>
                        </strong>
                    </Typography.Paragraph>
                </>
            }
        >
            <div
                style={{
                    display: 'flex',
                    width: '50%',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    disabled={true}
                    icon={<UserAddOutlined />}
                    type={'primary'}
                    size={'middle'}
                >
                    Add participant
                </Button>
                <Button disabled={!todo.isOwner} size={'middle'}>
                    <Link to={`/manage/${todo.id}`}>{'Edit Todo'}</Link>
                </Button>
            </div>
        </Card>
    );
}

export default observer(TodoDetailedHeader);
