import React from "react";
import { Button, Card, Comment, Divider, List, Tag, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { TodoWithParticipants } from "../../../app/models/todo";
import {
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import TodoParticipantsList from "./TodoParticipantsList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

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
    color: "green",
    name: "Low",
  },
  2: {
    color: "lime",
    name: "Normal",
  },
  3: {
    color: "volcano",
    name: "High",
  },
};

function TodoListItem({ todo }: Props) {
  const { todoStore } = useStore();
  const { deleteTodo } = todoStore;
  const history = useHistory();
  return (
    <List.Item key={todo.id}>
      <Card
        onClick={(e) => {
          e.stopPropagation();
          history.push(`/todos/${todo.id}`);
        }}
        style={{ width: "100%" }}
        hoverable
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "40%",
              borderRadius: "50%",
            }}
          >
            {todo.done ? <CheckSquareOutlined /> : <CloseSquareOutlined />}
            {todo.title}
          </div>
        }
        extra={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Card.Meta
              description={
                <Tag color={"blue"}>
                  {todo.isOwner ? "You are the owner" : todo.ownerName}
                </Tag>
              }
            />
            <ClockCircleOutlined style={{ marginRight: "10px" }} />
            {format(todo.finish_Time!, "dd MMM yyyy h:mm aa")}
          </div>
        }
      >
        <Typography.Paragraph>
          <Typography.Text type="secondary">{"Priority:"}</Typography.Text>
          <Tag color={priorities[todo.priority].color}>
            {priorities[todo.priority].name}
          </Tag>
          <Typography.Paragraph>
            <Typography.Text type="secondary">{"Description:"}</Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>{todo.description}</Typography.Paragraph>
          <Typography.Text type="secondary">{"Category:"}</Typography.Text>
          <Tag color={"geekblue"}>{todo.category.type}</Tag>
        </Typography.Paragraph>
        <Divider />
        <Typography.Text type="secondary">{"Comment:"}</Typography.Text>
        <Comment content={todo.comment} />
        <Divider />
        <Typography.Paragraph>
          <TodoParticipantsList participants={todo.participants!} />
        </Typography.Paragraph>
        <Divider />
        <Button
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
          }}
          danger
          icon={<DeleteOutlined />}
        >
          {"Delete"}
        </Button>
      </Card>
    </List.Item>
  );
}

export default observer(TodoListItem);
