import React from "react";
import { Link } from "react-router-dom";
import { Button, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Row style={{ marginTop: "7em" }}>
      <h1>Home page</h1>
      {userStore.isLoggedIn ? (
        <>
          {"Hello"}
          <Link to={"/todos"}>Todos</Link>
        </>
      ) : (
        <h3>
          Go to{" "}
          <Button onClick={() => modalStore.openModal(<LoginForm />)}>
            Login
          </Button>
          <Button onClick={() => modalStore.openModal(<RegisterForm />)}>
            Registration
          </Button>
        </h3>
      )}
    </Row>
  );
}

export default observer(HomePage);
