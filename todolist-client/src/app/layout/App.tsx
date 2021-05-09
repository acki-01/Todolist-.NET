import React, { useEffect } from "react";
import "../../App.css";
import NavBar from "./NavBar";
import TodoDashboard from "../../features/todos/dashboard/TodoDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import TodoForm from "../../features/todos/form/TodoForm";
import TodoDetails from "../../features/todos/details/TodoDetails";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import TestError from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoaderIndicator from "./LoaderIndicator";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoaderIndicator content={"Loading app..."} />;

  return (
    <Layout>
      <ToastContainer position={"bottom-right"} hideProgressBar />
      <ModalContainer />
      <Route exact path={"/"} component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Content style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path={"/todos"} component={TodoDashboard} />
                <Route path={"/todos/:id"} component={TodoDetails} />
                <Route
                  path={["/createTodo", "/manage/:id"]}
                  component={TodoForm}
                  key={location.key}
                />
                <Route path={"/errors"} component={TestError} />
                <Route path={"/server-error"} component={ServerError} />
                <Route path={"/login"} component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Content>
          </>
        )}
      />
    </Layout>
  );
}

export default observer(App);
