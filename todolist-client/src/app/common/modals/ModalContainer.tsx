import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Modal } from "antd";

function ModalContainer() {
  const { modalStore } = useStore();
  return (
    <Modal
      visible={modalStore.modal.open}
      onOk={modalStore.closeModal}
      onCancel={modalStore.closeModal}
      footer={[]}
    >
      {modalStore.modal.body}
    </Modal>
  );
}

export default observer(ModalContainer);
