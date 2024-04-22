import React from "react";
import ProtectRoute from "../Components/ProtectRoute";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user.values);
  console.log(user);

  return (
    <>
      <ProtectRoute>
        <div className="profile_wrapper">
          <div className="Card_wrapper">
            <div className="Card_title">
              <h1>Profile Information</h1>
            </div>
            <div className="Card_body">
              {/* name */}
              <div className="Card_data">
                <p>
                  <b>Name :-</b> &nbsp;
                  <span>{user?.name}</span>
                </p>
              </div>
              {/* name */}
              {/* email */}
              <div className="Card_data">
                <p>
                  <b>Email :-</b> &nbsp;
                  <span>{user?.email}</span>
                </p>
              </div>
              {/* email */}
              {/* phone no */}
              <div className="Card_data">
                <p>
                  <b>Phone No :-</b> &nbsp;
                  <span>{user?.phone}</span>
                </p>
              </div>
              <div className="Card_data">
                <p>
                  <b>Date :-</b> &nbsp;
                  <span>{user?.createdAt}</span>
                </p>
              </div>

              {/*  */}
              {/* Card data */}
            </div>
          </div>
        </div>
      </ProtectRoute>
    </>
  );
}

export default Profile;
