import { useState, useEffect } from "react";
import axios from "axios";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
          <div
            className="p-3 flex flex-row items-center bg-gray-100 rounded-3xl m-2"
            key={index}
          >
            <img
              src={oneUsers.avatar}
              alt="عکس ندارد"
              width={130}
              height={130}
              className="outline-blue-100  mr-8 rounded-3xl border-blue-200 border-2 shadow-black shadow-lg"
            />

            <div
              className="p-6 bg-gray-100  shadow-black shadow-lg rounded-3xl m-4"
            >
              <h2 className="text-black mb-2 font-extrabold">
                {"نام و نام خانوادگی: " + oneUsers.family + "  " + oneUsers.name}
              </h2>
              <h1>{"وضعیت خدمت: " + oneUsers.military}</h1>
              <h1>{"کد ملی: " + oneUsers.national_id}</h1>
              <h1>{"تاریخ تولد: " + oneUsers.date}</h1>
              <h1>{"شهر: " + oneUsers.city}</h1>
              <h1>{"جنسیت: " + (oneUsers.sex === "Female" ? "خانم" : "اقا")}</h1>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default AdminHome;
