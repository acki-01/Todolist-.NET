import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <div
      style={{
        display: "flex",
        minHeight: "700px",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "150px",
      }}
    >
      <h1>Home page</h1>
      {userStore.isLoggedIn ? (
        <>
          {"Hello"}
          <Link to={"/todos"}>Todos</Link>
        </>
      ) : (
        <>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Please:</h3>
          <div
            style={{
              width: "300px",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Button
              style={{ width: "120px" }}
              onClick={() => modalStore.openModal(<LoginForm />)}
            >
              Login
            </Button>
            <Button
              style={{ width: "120px" }}
              onClick={() => modalStore.openModal(<RegisterForm />)}
            >
              Register
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(HomePage);
