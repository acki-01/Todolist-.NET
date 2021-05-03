import { observer } from "mobx-react-lite";
import React from "react";
import { Todo } from "../../../app/models/todo";
import { Card, Divider, Row, Space, Tag } from "antd";
import {
  ClockCircleOutlined,
  InfoOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";

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

interface Props {
  todo: Todo;
}

function TodoDetailedInfo({ todo }: Props) {
  return (
    <Card>
      <Row>
        <Space size={"large"}>
          <InfoOutlined />
          <span>{todo.description}</span>
        </Space>
      </Row>
      <Divider />
      <Row>
        <Space size={"large"}>
          <StarOutlined />
          <Tag color={priorities[todo.priority].color}>
            {priorities[todo.priority].name}
          </Tag>
        </Space>
      </Row>
      <Divider />

      <Row>
        <Space size={"large"}>
          <ClockCircleOutlined style={{ marginRight: "10px" }} />
          <span>{format(todo.finish_Time!, "dd MMM yyyy h:mm aa")}</span>
        </Space>
      </Row>
    </Card>
  );
}

export default observer(TodoDetailedInfo);
