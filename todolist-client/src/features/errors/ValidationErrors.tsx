import React from "react";
import { Alert } from "antd";

interface Props {
  errors: string[];
}

export default function ValidationErrors({ errors }: Props) {
  return <Alert message={errors.join(",")} type={"error"} />;
}
