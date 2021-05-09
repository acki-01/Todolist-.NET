import React from "react";
import { Button, Divider, Dropdown, Menu, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import {
  CheckCircleTwoTone,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import SubMenu from "antd/es/menu/SubMenu";

function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
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
        <Menu.Item>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Button>
                    <NavLink to={`/profile/${user?.username}`}>
                      {"My profile"}
                    </NavLink>
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button onClick={logout}>Logout</Button>
                </Menu.Item>
              </Menu>
            }
            placement="bottomLeft"
          >
            <Typography.Text style={{ color: "white" }}>
              <UserOutlined />
              {user?.displayName}
              <DownOutlined />
            </Typography.Text>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default observer(NavBar);
