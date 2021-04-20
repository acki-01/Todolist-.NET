import React, { useEffect } from "react";
import TodoList from "./TodoList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoaderIndicator from "../../../app/layout/LoaderIndicator";
import { Col, Row } from "antd";
import TodoFilters from "./TodoFilters";

function TodoDashboard() {
  const { todoStore } = useStore();
  const { loadTodos, todoRegistry } = todoStore;

  useEffect(() => {
    if (todoRegistry.size <= 1) loadTodos();
  }, [todoRegistry.size, loadTodos]);

  if (todoStore.loadingInitial)
    return <LoaderIndicator content={"Loading App"} />;
  return (
    <>
      <Row>
        <Col span={"10"} offset={"4"}>
          <TodoList />
        </Col>
        <Col span={"4"} offset={"1"} style={{ marginTop: "44px" }}>
          <TodoFilters />
        </Col>
      </Row>
    </>
  );
}

export default observer(TodoDashboard);
