import React from "react";
import { Link } from "react-router-dom";
import { Row } from "antd";

export default function HomePage() {
  return (
    <Row style={{ marginTop: "7em" }}>
      <h1>Home page</h1>
      <h3>
        Go to <Link to={"/todos"}>Todos</Link>
      </h3>
    </Row>
  );
}
