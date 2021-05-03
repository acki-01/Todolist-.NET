import React, { useState } from "react";
import { Button, Typography, Card } from "antd";
import axios from "axios";
import ValidationErrors from "./ValidationErrors";

export default function TestErrors() {
  const baseUrl = "http://localhost:5000/";
  const [errors, setErrors] = useState([]);

  function handleNotFound() {
    axios
      .get(baseUrl + "buggy/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios
      .get(baseUrl + "buggy/server-error")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios
      .get(baseUrl + "buggy/unauthorised")
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios.get(baseUrl + "todos/notaguid").catch((err) => console.log(err));
  }

  function handleValidationError() {
    axios.post(baseUrl + "todos", {}).catch((err) => setErrors(err));
  }

  return (
    <>
      <Typography.Title>{"Test Error component"}</Typography.Title>
      <Card>
        <Button.Group>
          <Button onClick={handleNotFound}>{"Not Found"}</Button>
          <Button onClick={handleBadRequest}>{"Bad Request"}</Button>
          <Button onClick={handleValidationError}>{"Validation Error"}</Button>
          <Button onClick={handleServerError}>{"Server Error"}</Button>
          <Button onClick={handleUnauthorised}>{"Unauthorised"}</Button>
          <Button onClick={handleBadGuid}>{"Bad Guid"}</Button>
        </Button.Group>
      </Card>
      {errors.length && <ValidationErrors errors={errors} />}
    </>
  );
}
