import { Button, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUsers } from "../../Redux/Slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { setLoader } from "../../Redux/Slices/loaderSlice";
import { LogoutOutlined } from "@ant-design/icons";
import axiosInstance from "../../Servers/ApiService";

function Header() {
  const user = useSelector((state) => state.user.values);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logouthandle = () => {
    dispatch(setLoader(true));
    try {
      dispatch(setLogout());
      navigate("/login");
      dispatch(setLoader(false));
    } catch (error) {
      message.error(error?.response?.data);
      dispatch(setLoader(false));
    }
  };

  // get Users
  const getUser = async () => {
    try {
      dispatch(setLoader(true));

      const apicall = await axiosInstance.get("/user/getUser");
      if (apicall) {
        dispatch(setUsers(apicall.data));
        dispatch(setLoader(false));
      }
    } catch (error) {
      message.error(error?.response?.data);
      dispatch(setLoader(false));
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="header">
      <h1>
        <Link to="/">BI Test</Link>
      </h1>
      <button>
        <Link to="/profile">{user?.name}</Link> &nbsp;
        <LogoutOutlined onClick={() => logouthandle()} />
      </button>
    </div>
  );
}

export default Header;
