import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Image, Card, Typography } from "antd";
import { Todo } from "../../../app/models/todo";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const activityImageStyle = {
  filter: "brightness(30%)",
};

interface Props {
  todo: Todo;
}

interface Props {
  todo: Todo;
}

function TodoDetailedHeader({ todo }: Props) {
  return (
    <Card
      cover={
        <Image
          style={activityImageStyle}
          src={"/assets/categoryImages/sports.jpg"}
        />
      }
      title={<Typography.Title>{todo.title}</Typography.Title>}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "75%",
        }}
      >
        <Button type={"primary"}>Share Todo</Button>
        <Button>
          <Link to={`/manage/${todo.id}`}>{"Manage Todo"}</Link>
        </Button>
        <Button danger icon={<DeleteOutlined />}>
          Cancel Share
        </Button>
      </div>
    </Card>
  );
}

export default observer(TodoDetailedHeader);
