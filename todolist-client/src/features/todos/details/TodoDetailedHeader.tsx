import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Image, Card, Typography } from "antd";
import { TodoWithParticipants } from "../../../app/models/todo";
import { Link } from "react-router-dom";

const activityImageStyle = {
  filter: "brightness(30%)",
  height: "400px",
};

interface Props {
  todo: TodoWithParticipants;
}

function TodoDetailedHeader({ todo }: Props) {
  return (
    <Card
      style={{ padding: "24px" }}
      cover={
        <Image
          style={activityImageStyle}
          src={`/assets/categoryImages/${todo.category.type}.jpg`}
        />
      }
      title={
        <>
          <Typography.Title>{todo.title}</Typography.Title>
          <Typography.Paragraph>
            Owned by{" "}
            <strong>
              <Link to={`/profiles/${todo.owner?.userName}`}>
                {todo.owner?.displayName}
              </Link>
            </strong>
          </Typography.Paragraph>
        </>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "40%",
        }}
      >
        <Button type={"primary"}>Add participant</Button>
        <Button disabled={!todo.isOwner}>
          <Link to={`/manage/${todo.id}`}>{"Edit Todo"}</Link>
        </Button>
      </div>
    </Card>
  );
}

export default observer(TodoDetailedHeader);
