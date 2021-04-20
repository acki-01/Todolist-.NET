import React from "react";
import { Card, Menu, Space } from "antd";
import Calendar from "react-calendar";

export default function TodoFilters() {
  return (
    <Space size={"large"} direction={"vertical"}>
      <Card title={"Filters"}>
        <Menu mode="vertical" style={{ width: "100%" }}>
          <Menu.Item>All todos</Menu.Item>
          <Menu.Item>Done todos</Menu.Item>
          <Menu.Item>Undone todos</Menu.Item>
        </Menu>
      </Card>
      <Calendar />
    </Space>
  );
}
