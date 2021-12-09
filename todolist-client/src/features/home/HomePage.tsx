import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import {
  Container,
  Subtitle,
  ButtonContainer,
  StyledLink,
  StyledSpan,
} from "./styled";
import bg from "./start/shia.jpg";

function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Container bg={bg}>
      {userStore.isLoggedIn ? (
        <StyledLink to={"/todos"}>Todos</StyledLink>
      ) : (
        <>
          <Subtitle>Please:</Subtitle>
          <ButtonContainer>
            <Button
              type="primary"
              onClick={() => modalStore.openModal(<LoginForm />)}
            >
              Login
            </Button>
            <Button onClick={() => modalStore.openModal(<RegisterForm />)}>
              Register
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}

export default observer(HomePage);
