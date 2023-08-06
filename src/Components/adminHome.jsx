import { useState, useEffect } from "react";
import axios from "axios";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import User from "./user";

const AdminHome = () => {
  const [usersState, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTimeout(() => {
      // Because it doesn't take time to load data from the fake API (fake API is a package)
      axios
        .get(process.env.REACT_APP_GET_USERS_URL)
        .then((resp) => {
          setUsers(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, []);

  function skeletonLoading() {
    let tempArr = Array(15).fill("");
    return (
      <>
        <h2 className="m-4 font-extrabold ">خانه</h2>
        {tempArr.map((val, index) => (
          <div
            className="animate-ease-in flex bg-gray-200 p-3 mt-3 flex-row items-center rounded-3xl mr-3"
            key={index}
          >
            <SkeletonTheme>
              <Skeleton
                style={{ borderRadius: 24 }}
                height={130}
                width={130}
                className="border-blue-100 border-2 outline-blue-100 shadow-black shadow-lg rounded-3xl mr-4"
              />
              <div className="flex-col w-full">
                <Skeleton
                  height={220}
                  style={{ borderRadius: 24 }}
                  className="mb-4 mr-4 rounded-3xl outline-blue-100 shadow-black shadow-lg border-blue-100 border-2"
                />
              </div>
            </SkeletonTheme>
          </div>
        ))}
      </>
    );
  }

  const filteredUsers = usersState.filter((user) => {
    const fullName = user.family + " " + user.name;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="m-4">
        <h2 className="font-extrabold">خانه</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 mt-2 rounded-md w-1/6"
          placeholder="جستجو بر اساس نام و نام خانوادگی"
          
        />
      </div>

      {usersState.length === 0 ? (
        skeletonLoading()
      ) : (
        filteredUsers.map((oneUsers, index) => (
          <User key={index} sex={oneUsers.sex} city={oneUsers.city} date={oneUsers.date} national_id={oneUsers.national_id} military={oneUsers.military} family={oneUsers.family} name={oneUsers.name} avatar={oneUsers.avatar}/>
        ))
      )}
    </>
  );
};

export default AdminHome;