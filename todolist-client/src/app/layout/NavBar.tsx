import React from "react";
import { Button, Divider, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { CheckCircleTwoTone } from "@ant-design/icons";

export default function NavBar() {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item>
          <NavLink
            to={"/"}
            exact
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CheckCircleTwoTone style={{ fontSize: "36px" }} />
            Todos App
          </NavLink>
        </Menu.Item>
        <Divider type={"vertical"} />
        <NavLink to={"/todos"}>Todo</NavLink>
        <Divider type={"vertical"} />
        <NavLink to={"/errors"}>Errors</NavLink>
        <Menu.Item>
          <Button>
            <NavLink to={"/createTodo"}>Create Todo</NavLink>
          </Button>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
