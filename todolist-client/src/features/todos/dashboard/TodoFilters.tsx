import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { SORT_TYPES } from '../../../app/stores/todoStore';
import { StyledFilters, FiltersItem } from './styled';

function TodoFilters() {
    const { todoStore } = useStore();
    const { loadTodos } = todoStore;
    return (
        <StyledFilters title={'Filters'}>
            <FiltersItem onClick={() => loadTodos(SORT_TYPES.ALL)}>
                All todos
            </FiltersItem>
            <FiltersItem onClick={() => loadTodos(SORT_TYPES.DONE)}>
                Done todos
            </FiltersItem>
            <FiltersItem onClick={() => loadTodos(SORT_TYPES.UNDONE)}>
                Undone todos
            </FiltersItem>
        </StyledFilters>
    );
}

export default observer(TodoFilters);
