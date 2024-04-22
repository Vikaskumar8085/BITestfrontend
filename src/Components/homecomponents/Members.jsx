import React, { useEffect, useState } from "react";
import ProtectRoute from "../ProtectRoute";
import { Table, message } from "antd";
import axiosInstance from "../../Servers/ApiService";
import { useParams } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setLoader } from "../../Redux/Slices/loaderSlice";

function Members() {
  const dispatch = useDispatch();
  const params = useParams();
  const [Memeberdata, setIsMemberData] = useState([]);

  console.log(params.id);

  // handleDelete

  // const handleDelete = async (values) => {
  //   try {
  //     console.log(values);
  //     const valuedata = {
  //       groupId: params.id,
  //       memberIds: values,
  //     };
  //     const apicall = await axiosInstance.post(
  //       "/group/removemembers",
  //       valuedata
  //     );
  //     console.log(apicall.status);

  //     getallMembers();
  //   } catch (error) {
  //     message.error(error.response?.data);
  //   }
  // };
  // handleDelete

  const getallMembers = async () => {
    try {
      dispatch(setLoader(true));
      return await axiosInstance
        .get(`/group/getallMembers/${params.id}`)
        .then((response) => {
          if (response.status == 200) {
            dispatch(setLoader(false));

            setIsMemberData(response.data);
          }
        });
    } catch (error) {
      message.error(error.response?.data);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getallMembers();
  }, [0]);

  // columbs
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
    },
    // {
    //   title: "Actions",
    //   dataIndex: "Actions",
    //   render: (index, records) => {
    //     return (
    //       <>
    //         <span>
    //           <DeleteOutlined onClick={() => handleDelete(records._id)} />
    //         </span>
    //       </>
    //     );
    //   },
    // },
  ];

  // columbs

  return (
    <>
      <ProtectRoute>
        <div className="member_wrapper">
          {Memeberdata.length > 0 ? (
            <Table dataSource={Memeberdata} columns={columns} />
          ) : (
            <p>There are no members </p>
          )}
        </div>
      </ProtectRoute>
    </>
  );
}

export default Members;
