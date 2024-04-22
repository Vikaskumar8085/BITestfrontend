import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import axiosInstance from "../Servers/ApiService";
import { useDispatch } from "react-redux";
import { setLoader } from "../Redux/Slices/loaderSlice";
import { setLogin } from "../Redux/Slices/UserSlice";

function Login() {
  const [form] = Form.useForm();
  // dispatch

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // dispatch

  const handlesubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const apicall = await axiosInstance.post("/user/login", value);
      console.log(apicall.status);
      if (apicall.status === 200) {
        console.log(apicall.data);
        dispatch(setLogin(apicall.data));
        dispatch(setLoader(false));
        navigate("/");
        form.resetFields();
      }
      form.resetFields();
    } catch (error) {
      message.error(error.response?.data);
      dispatch(setLoader(false));
      form.resetFields();
      navigate("/login");
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
      <div className="login_container">
        <div className="login_row">
          <div className="login_header">
            <h2>BI Test Login</h2>
          </div>
          <Form
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={handlesubmit}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your Email !" }]}
            >
              <Input
                placeholder="please Enter your Email"
                autocomplete="false"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                placeholder="please Enter Your Password"
                autocomplete="false"
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--color)",
                  width:'100%'
                }}
                htmlType="Submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          <div className="login_footer">
            <h5>
              Create An Account ? <Link to="/register">Register</Link>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
