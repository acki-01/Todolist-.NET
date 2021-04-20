import React from "react";
import { List, Comment } from "antd";
import { observer } from "mobx-react-lite";

function TodoDetailedComments() {
  return (
    <List
      className="comment-list"
      header={`0 replies`}
      itemLayout="horizontal"
      dataSource={[]}
      renderItem={(item) => (
        <li>
          <Comment
            actions={["actions"]}
            author={"author"}
            avatar={"avatar"}
            content={"content"}
            datetime={"date"}
          />
        </li>
      )}
    />
  );
}

export default observer(TodoDetailedComments);
