import React, { useEffect } from 'react';
import TodoList from './TodoList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoaderIndicator from '../../../app/layout/LoaderIndicator';
import { Col, Row } from 'antd';
import TodoFilters from './TodoFilters';
import { StyledTodoList, Container } from './styled';

function TodoDashboard() {
    const { todoStore } = useStore();
    const { loadTodos, todoRegistry } = todoStore;

    useEffect(() => {
        if (todoRegistry.size <= 1) loadTodos();
    }, [todoRegistry.size, loadTodos]);
    if (todoStore.loadingInitial)
        return <LoaderIndicator content={'Loading todos...'} />;
    return (
        <Container>
            <TodoFilters />
            <TodoList />
        </Container>
    );
}

export default observer(TodoDashboard);
