import { Button, Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import axiosInstance from "../../Servers/ApiService";

function InviteFreind() {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (value) => {
    try {
      console.log(value, "vallues");

      const apicall = await axiosInstance.post("/user/invite", value);
      if (apicall.status === 200) {
        message.success(apicall.data);
      }

      form.resetFields();
      setIsOpen(false);
    } catch (error) {
      message.error(error.response?.data);
    }
  };
  return (
    <>
      <Button
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--color)",
        }}
        onClick={() => setIsOpen(true)}
      >
        Invite Freind
      </Button>

      <Modal
        centered
        onCancel={() => setIsOpen(false)}
        open={isOpen}
        footer={false}
      >
        <Form onFinish={handleSubmit} form={form} layout="vertical">
          <Form.Item
            label={"Invitataion Email"}
            name="email"
            rules={[
              { required: true, message: "Please Enter Invitation Email!" },
            ]}
          >
            <Input placeholder="Please Enter Invitation Email" type="email" />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                backgroundColor: "var(--background-color)",
                color: "var(--color)",
                width: "100%",
              }}
              htmlType="submit"
            >
              submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default InviteFreind;
