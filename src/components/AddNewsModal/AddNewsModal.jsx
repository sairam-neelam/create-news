import { useState } from "react";
import { Modal } from "antd";

const AddNewsModal = ({ modalOpen, closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(modalOpen);

  const handleOk = () => {
    closeModal(false);
  };

  const handleCancel = () => {
    closeModal(false);
  };

  return (
    <Modal
      title="Add News"
      open={modalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      News
    </Modal>
  );
};

export default AddNewsModal;
