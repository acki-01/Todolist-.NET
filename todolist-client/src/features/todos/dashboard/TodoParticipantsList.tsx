import React from "react";
import { observer } from "mobx-react-lite";
import { Profile } from "../../../app/models/profile";
import { Typography } from "antd";

interface Props {
  participants: Profile[];
}

function TodoParticipantsList({ participants }: Props) {
  return (
    <>
      <Typography.Text type="secondary">{"Participants:"}</Typography.Text>
      {participants.map((participant) => participant.userName).join(", ")}
    </>
  );
}

export default observer(TodoParticipantsList);
