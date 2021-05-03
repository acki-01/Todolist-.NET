import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, page not found."
      extra={
        <Button type="primary">
          <Link to={"/todos"}>{"Back to Todos"}</Link>
        </Button>
      }
    />
  );
}
