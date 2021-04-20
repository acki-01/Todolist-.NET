import React from "react";
import { Spin } from "antd";

interface Props {
  inverted?: boolean;
  content?: string;
}

export default function LoaderIndicator({ content = "Loading..." }: Props) {
  return <Spin size="large" spinning={true} tip={content} />;
}
