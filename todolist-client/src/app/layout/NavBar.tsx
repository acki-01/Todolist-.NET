import { Button, Menu, Typography } from "antd";
import { NavLink } from "react-router-dom";
import {
  CheckCircleTwoTone,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import {
  StyledHeader,
  StyledMenuElements,
  StyledMenu,
  StyledNavLink,
  StyledDropdown,
} from "./styled";

function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <StyledHeader>
      <StyledMenu theme="dark" mode="horizontal">
        <StyledMenuElements>
          <Menu.Item>
            <StyledNavLink
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
            </StyledNavLink>
          </Menu.Item>
          <NavLink to={"/todos"}>Todo</NavLink>
          <NavLink to={"/errors"}>Errors</NavLink>
          <Menu.Item>
            <Button>
              <NavLink to={"/createTodo"}>Create Todo</NavLink>
            </Button>
          </Menu.Item>
        </StyledMenuElements>
        <Menu.Item>
          <StyledDropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Button>
                    <NavLink to={`/profile/${user?.userName}`}>
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
          </StyledDropdown>
        </Menu.Item>
      </StyledMenu>
    </StyledHeader>
  );
}

export default observer(NavBar);
