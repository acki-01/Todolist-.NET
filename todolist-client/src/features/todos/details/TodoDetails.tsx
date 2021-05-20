import React, { useEffect } from "react";
import { Row, Col, Space } from "antd";
import { useStore } from "../../../app/stores/store";
import LoaderIndicator from "../../../app/layout/LoaderIndicator";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TodoDetailedHeader from "./TodoDetailedHeader";
import TodoDetailedInfo from "./TodoDetailedInfo";

function TodoDetails() {
  const { todoStore } = useStore();
  const { selectedTodo: todo, loadTodo, loadingInitial } = todoStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadTodo(id);
  }, [id, loadTodo]);

  if (loadingInitial || !todo) return <LoaderIndicator />;
  return (
    <Row>
      <Col span={"10"}>
        <Space direction="vertical">
          <TodoDetailedHeader todo={todo} />
          <TodoDetailedInfo todo={todo} />
        </Space>
      </Col>
    </Row>
  );
}

export default observer(TodoDetails);
