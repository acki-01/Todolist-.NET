import React from "react";
import "../../App.css";
import NavBar from "./NavBar";
import TodoDashboard from "../../features/todos/dashboard/TodoDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import TodoForm from "../../features/todos/form/TodoForm";
import TodoDetails from "../../features/todos/details/TodoDetails";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import TestError from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  return (
    <Layout>
      <ToastContainer position={"bottom-right"} hideProgressBar />
      <Route exact path={"/"} component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Content style={{ marginTop: "7em" }}>
              <Route exact path={"/todos"} component={TodoDashboard} />
              <Route path={"/todos/:id"} component={TodoDetails} />
              <Route
                path={["/createTodo", "/manage/:id"]}
                component={TodoForm}
                key={location.key}
              />
              <Route path={"/errors"} component={TestError} />
            </Content>
          </>
        )}
      />
    </Layout>
  );
}

export default observer(App);
