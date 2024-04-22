import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Servers/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../Redux/Slices/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // form reset fileld
  const [form] = Form.useForm();
  const handlesubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      return await axiosInstance
        .post("/user/register", value)
        .then((response) => {
          if (response.status === 200) {
            navigate("/login");
            message.success("register succesfully");
            dispatch(setLoader(false));
            form.resetFields();
          }
        });
    } catch (error) {
      form.resetFields();
      message.error(error.response?.data);
      navigate("/register");
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/";
    }
  });
  return (
    <>
      <div className="register_container">
        <div className="register_row">
          <div className="register_head">
            <h2>BI Test Registration</h2>
          </div>
          <Form
            autoComplete="off"
            form={form}
            layout="vertical"
            onFinish={handlesubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input placeholder="please enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input placeholder="please enter your Email" />
            </Form.Item>
            <Form.Item
              label="Phone No"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone no!" },
              ]}
            >
              <Input placeholder="Please Enter Your Phone Number" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password placeholder="Please Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="Submit"
                style={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--color)",
                  width: "100%",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          <div className="register_footer">
            <h5>
              already have an account ? <Link to="/login">login</Link>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
