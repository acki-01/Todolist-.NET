import React from "react";
import { Card, List, Space } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { SORT_TYPES } from "../../../app/stores/todoStore";

function TodoFilters() {
  const { todoStore } = useStore();
  const { loadTodos } = todoStore;
  return (
    <Space size={"large"} direction={"vertical"}>
      <Card title={"Filters"}>
        <List style={{ width: "100%" }}>
          <List.Item onClick={() => loadTodos(SORT_TYPES.ALL)}>
            All todos
          </List.Item>
          <List.Item onClick={() => loadTodos(SORT_TYPES.DONE)}>
            Done todos
          </List.Item>
          <List.Item onClick={() => loadTodos(SORT_TYPES.UNDONE)}>
            Undone todos
          </List.Item>
        </List>
      </Card>
    </Space>
  );
}

export default observer(TodoFilters);
