import styled from 'styled-components';
import TodoList from './TodoList';
import { Card, List } from 'antd';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 768px;
    min-width: 420px;
`;

export const StyledTodoList = styled(TodoList)`
    display: flex;
    flex-direction: column;
`;

export const FiltersItem = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    &:hover {
        background-color: #001529;
        color: white;
        cursor: pointer;
    }
`;

export const StyledFilters = styled(Card)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div.ant-card-head {
        width: 100%;
        background-color: #001529;
        color: white;
        font-weight: bold;
        font-size: 18px;
    }

    div.ant-card-body {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }
`;

export const StyledCardMeta = styled.div`
    width: 100%;
`;

export const StyledListItem = styled(List.Item)`
    div.ant-card {
        width: 100%;
    }
    div.ant-card-body {
        padding-top: 10px;
        height: 150px;
    }
    h4 {
        margin: 0;
    }
`;
