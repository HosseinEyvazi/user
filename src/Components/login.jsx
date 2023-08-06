import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [users, setUsers] = useState([]);
  const [nationalIdState, setNationalId] = useState();
  const [passState, setPass] = useState();
  const [signErrState, setSignErr] = useState(false);
  const navigate = useNavigate();
  let nationalRef = useRef();
  let passRef = useRef();

  useEffect(() => {}, []);

  return (
    <>
      <h2 className="m-4 font-extrabold ">صفحه ورود</h2>

      <div className="flex flex-col items-center justify-center  h-full">
        <div className="animate-fade-left w-2/6 bg-blue-100 mt-7 mb-9  px-60 py-8 rounded-3xl shadow-black shadow-2xl flex justify-center items-center">
          <form
            action=""
            className="flex-col flex w-1/2 items-center content-center"
          >
            <label
              style={{ whiteSpace: "nowrap" }}
              htmlFor="national_id "
              className="w-"
            >
              کد ملی
            </label>
            <input
              id="national_id"
              type="text"
              ref={nationalRef}
              className="rounded-md"
              onChange={(e) => setNationalId(e.target.value)} // Uncomment this line
            />

            <label htmlFor="password">رمز</label>
            <input
              id="password"
              type="text"
              ref={passRef}
              className="rounded-md"
              onChange={(e) => setPass(e.target.value)} // Uncomment this line
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                handleLoginButton();
              }}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-10"
            >
              ورود
            </button>
            {signErrState === true ? (
              <h1
                style={{ whiteSpace: "nowrap" }}
                className=" mt-5 text-red-600"
              >
                کد ملی یا رمز اشتباه است
              </h1>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </>
  );

  function handleLoginButton() {
    axios
      .get(process.env.REACT_APP_GET_USERS_URL)
      .then((resp) => {
        setUsers(resp.data);
        console.log(resp.data);

        const filteredUser = resp.data.filter((user) => {
          console.log("user.national_id" + user);
          console.log("nationalRef.current.value" + nationalRef.current.value);
          return user.national_id === nationalRef.current.value;
        });

        if (
          filteredUser.length > 0 &&
          filteredUser[0] &&
          filteredUser[0].password === passRef.current.value
        ) {
          console.log("if statement is true xxxx");

          if (
            filteredUser[0].national_id ===
            process.env.REACT_APP_ADMIN_NATIONAL_ID
          ) {
            props.onSignInAdmin();
          } else {
            props.onSignIn();
          }

          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else {
          setSignErr(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSignErr(true);
      });
  }
};

export default Login;
