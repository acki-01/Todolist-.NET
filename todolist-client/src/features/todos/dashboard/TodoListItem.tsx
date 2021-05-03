import React from "react";
import {
  Button,
  Card,
  Comment,
  Divider,
  List,
  Tag,
  Typography,
  Image,
} from "antd";
import { useHistory } from "react-router-dom";
import { Todo } from "../../../app/models/todo";
import { ClockCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { format } from "date-fns";

interface Props {
  todo: Todo;
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

export default function TodoListItem({ todo }: Props) {
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
            <Image src={"/assets/user.png"} width={50} />
            {todo.title}
          </div>
        }
        extra={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tag color={priorities[todo.priority].color}>
              {priorities[todo.priority].name}
            </Tag>
            <Card.Meta
              title={<ClockCircleOutlined style={{ marginRight: "10px" }} />}
              description={format(todo.updated_At!, "dd MMM yyyy h:mm aa")}
            />
          </div>
        }
      >
        <Typography.Paragraph>
          <Typography.Text type="secondary">{"Description"}</Typography.Text>
          <Typography.Paragraph>{todo.description}</Typography.Paragraph>
          <Comment content={todo.comment} />
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Divider />
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            danger
            // loading={loading && target === todo.id}
            icon={<DeleteOutlined />}
          >
            {"Delete"}
          </Button>
        </Typography.Paragraph>
        <Tag color={"geekblue"}>{todo.category}</Tag>
      </Card>
    </List.Item>
  );
}
