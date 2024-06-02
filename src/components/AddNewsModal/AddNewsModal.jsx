import { useState } from "react";
import { Modal, Form, Select, Input, Button } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddNewsModal.css";
import { CATEGORIES } from "./constants";
import { getCurrentFormattedDateTime } from "../../utils/common";

const AddNewsModal = ({ modalOpen, closeModal, addNews }) => {
  const [isModalOpen, setIsModalOpen] = useState(modalOpen);
  const [newForm] = Form.useForm();
  const [content, setContent] = useState("");

  const handleOk = () => {
    closeModal(false);
  };

  const handleCancel = () => {
    closeModal(false);
  };

  const submitForm = () => {
    newForm
      .validateFields()
      .then(() => {
        const formData = newForm.getFieldsValue();
        const data = {
          introText: formData.introText,
          category: formData.category ? formData.category : "None",
          postedBy: formData.email,
          date: getCurrentFormattedDateTime(),
          isPublished: false,
          isUpdatedFromMobile: false,
        };
        addNews(data);
        handleOk();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitBtn = (
    <Button htmlType="submit" key="submit" onClick={submitForm}>
      Submit
    </Button>
  );

  return (
    <Modal
      title="Add News"
      open={modalOpen}
      onCancel={handleCancel}
      footer={[submitBtn]}
      destroyOnClose
      animation={false}
    >
      <Form
        form={newForm}
        layout="vertical"
        autoComplete="off"
        onFinish={submitForm}
      >
        <Form.Item
          name="introText"
          label="Intro Text"
          rules={[{ required: true, message: "Enter Intro text" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please input the content!" }]}
        >
          <ReactQuill value={content} onChange={setContent} />
        </Form.Item>
        <Form.Item label="Category">
          <Select options={CATEGORIES} placeholder="Select Category" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Email is invalid" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewsModal;
