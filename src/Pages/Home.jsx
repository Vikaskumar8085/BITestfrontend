import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ProtectRoute from "../Components/ProtectRoute";
import axiosInstance from "../Servers/ApiService";
import InviteFreind from "../Components/homecomponents/InviteFreind";
import { setGroups } from "../Redux/Slices/SliceGroup";
import { Link } from "react-router-dom";
import {
  CloseOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { setLoader } from "../Redux/Slices/loaderSlice";

function Home() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isgroupsdata, setIsGroupdata] = useState("");

  const [isId, setIsId] = useState(null);
  console.log(isId, "id groupmemeber");

  // get all user states
  const [optiondata, setoption] = useState([]);
  const [selected, setSelected] = useState([]);
  // console.log("====================================");
  // console.log(
  //   selected.map((items) => {
  //     return items._id;
  //   })
  // );
  // console.log("====================================");
  // console.log(optiondata, "optiondata");
  // get all user states

  const user = useSelector((state) => state.user.values);
  const isGroups = useSelector((state) => state.groups.groupvalues);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMember, setIsOpenMember] = useState(false);

  // get groups
  const getGroups = async () => {
    try {
      const apicall = await axiosInstance.get("/group/get-groups");
      // setIsGroups(apicall.data);
      // console.log(apicall.data);
      if (apicall.status === 200) {
        // message.success("");
        dispatch(setGroups(apicall.data));
      }
    } catch (error) {
      message.error(error.response?.data);
    }
  };

  // create groups
  const handleSubmit = async (value) => {
    try {
      // loader
      const data = {
        creator_id: user?._id.toString(),
        groupName: value.groupName,
      };
      value = data;
      console.log(value);
      const apicall = await axiosInstance.post("/group/create-group", value);
      if (apicall.status == 201) {
        setIsOpen(false);
        message.success(apicall.data);
      }
      form.resetFields();
      setIsOpen(false);
      getGroups();
    } catch (error) {
      message.error(error.response?.data);
      form.resetFields();
    }
  };

  // create grops

  // handle Delete
  const handleDelete = async (value) => {
    try {
      const apicall = await axiosInstance.delete(
        `/group/remove-group/${value}`
      );
      if (apicall.status === 200) {
        message.success(apicall.data);

        getGroups();
        setIsGroupdata(null);
      }
    } catch (error) {
      message.error(error.response?.data);
    }
  };
  // handle Delete
  // get all users
  const getallusers = async () => {
    try {
      return await axiosInstance.get("/user/getall").then((response) => {
        console.log(response.data);
        setoption(response.data);
      });
    } catch (error) {
      message.error(error.response?.data);
    }
  };
  // get all users

  // handleSubmit

  // handle checkbox

  const handleCheckboxChange = async (value) => {
    const selectedIndex = selected.indexOf(value);
    if (selectedIndex === -1) {
      setSelected([...selected, value]);
    } else {
      setSelected([
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ]);
    }
  };

  // handle checkbox

  const handleMember = async () => {
    try {
      // dispatch(setLoader(true));
      const selectdata = await selected.map((item) => item._id);
      // console.log(selectdata, "apicall");

      const values = {
        groupId: isId,
        memberIds: selectdata,
      };
      console.log(values, "apicalls");
      const apicall = await axiosInstance.post("/group/addmemebers", values);
      if (apicall.status === 200) {
        setIsOpenMember(false);
        dispatch(setLoader(false));
        setIsId(null);
      }
      console.log(apicall.data);
    } catch (error) {
      message.error(error.response?.data);
      dispatch(setLoader(false));
    }
  };

  // handleSubmit

  useEffect(() => {
    getallusers();
    getGroups();
  }, []);
  return (
    <>
      <ProtectRoute>
        <div className="container_row">
          {/* left groups */}
          <div className="leftgroup">
            <div className="leftgroup_head">
              {/* create groups */}
              <Button
                style={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--color)",
                }}
                onClick={() => setIsOpen(true)}
              >
                <UsergroupAddOutlined /> Create Group
              </Button>
              <Modal
                centered
                onCancel={() => setIsOpen(false)}
                open={isOpen}
                footer={false}
              >
                <Form
                  onFinish={handleSubmit}
                  form={form}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item
                    label={"Create Group"}
                    name="groupName"
                    rules={[
                      { required: true, message: "Please Enter Group Name!" },
                    ]}
                  >
                    <Input placeholder="Please Enter Group Name" />
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
              {/* create groups */}
              {/* invite Friend */}
              <InviteFreind />
              {/* invite Friend */}
            </div>
            <hr />
            <div className="leftgroup_links">
              <div className="leftgroup_header">
                <h4>All Groups</h4>
              </div>
              <div className="leftgroup_lists">
                {isGroups.length > 0 ? (
                  isGroups?.map((items, index) => {
                    return (
                      <ul>
                        <li onClick={() => setIsGroupdata(items)}>
                          {items.groupName}
                        </li>
                        <li>
                          <DeleteOutlined
                            onClick={() => handleDelete(items?._id)}
                          />
                        </li>
                      </ul>
                    );
                  })
                ) : (
                  <p
                    style={{
                      color: "red",
                      textTransform: "capitalize",
                    }}
                  >
                    please create a groups
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* left Groups */}
          {/* rights groups */}
          <div className="rightgroup">
            {isgroupsdata ? (
              <div className="rightgroup_head">
                <div className="head_titile">
                  <h1>{isgroupsdata?.groupName}</h1>
                </div>
                <div className="rightgroup_head_wrapper">
                  <Button
                    onClick={() => {
                      setIsOpenMember(true);
                      setIsId(isgroupsdata?._id);
                    }}
                    style={{
                      backgroundColor: "var(--background-color)",
                      color: "var(--color)",
                    }}
                  >
                    Add Memebrs <PlusOutlined />
                  </Button>

                  {/* add member model */}
                  <Modal
                    title="Add Members"
                    open={isOpenMember}
                    onCancel={() => {
                      setIsOpenMember(false);
                      setIsId(null);
                      setSelected([]);
                    }}
                    footer={false}
                  >
                    <div
                      className="Modela"
                      style={{
                        padding: "4px",
                        overflow: "auto",
                        maxHeight: "500px",
                      }}
                    >
                      {selected.map((item) => {
                        return (
                          <Button style={{ margin: "4px" }}>
                            {item?.name}
                          </Button>
                        );
                      })}

                      {optiondata.map((items, index) => {
                        return (
                          <ul
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <li
                              style={{
                                // padding: "10px 0px",/
                                padding: "10px 0px",
                                fontFamily: "sans-serif",
                                fontSize: "1em",
                                listStyleType: "none",
                                fontWeight: 100,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                              }}
                            >
                              {items?.name}
                            </li>
                            <li
                              style={{
                                // padding: "10px 0px",/
                                margin: "10px 0px",
                                fontFamily: "sans-serif",
                                fontSize: "1em",
                                listStyleType: "none",
                                fontWeight: 100,
                                accentColor: "var(--background-color)",
                              }}
                            >
                              <input
                                type="checkbox"
                                value={items?._id}
                                checked={selected.includes(items)}
                                onChange={() => handleCheckboxChange(items)}
                                // onClick={() => {
                                //   setSelected([...selected, items]);
                                // }}
                              />
                            </li>
                          </ul>
                        );
                      })}

                      <Button
                        style={{
                          backgroundColor: "var(--background-color)",
                          color: "var(--color)",
                          width: "100%",
                        }}
                        htmlType="Submit"
                        onClick={() => handleMember()}
                      >
                        add Members
                      </Button>
                    </div>
                  </Modal>
                  {/* add member model */}

                  <Link to={`/members/${isgroupsdata?._id}`}>
                    <EyeOutlined /> Members
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="rightgroup_box">
                  <img
                    src="https://www.pngmart.com/files/16/Speech-Chat-Icon-Transparent-PNG.png"
                    alt=""
                    style={{ height: "400px", width: "400px" }}
                  />
                  <h1>Select a Group to chat</h1>
                </div>
              </>
            )}
          </div>
          {/* rights groups */}
        </div>
      </ProtectRoute>
    </>
  );
}

export default Home;
