import React, { Fragment } from 'react';
import { List } from 'antd';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import TodoListItem from './TodoListItem';
import Text from 'antd/es/typography/Text';

function TodoList() {
    const { todoStore } = useStore();
    const { groupedTodos } = todoStore;
    return (
        <>
            {groupedTodos.map(([group, todos]) => (
                <Fragment key={group}>
                    <List
                        header={<Text>{group}</Text>}
                        dataSource={todos}
                        renderItem={(todo) => <TodoListItem todo={todo} />}
                    />
                </Fragment>
            ))}
        </>
    );
}

export default observer(TodoList);
