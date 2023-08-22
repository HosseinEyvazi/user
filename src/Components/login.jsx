import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import persianToEnglishNumber from "../utlis/utils";
import { ltr } from "semver";
const Login = (props) => {
  const [users, setUsers] = useState([]);
  const [nationalIdState, setNationalId] = useState();

  const [passState, setPass] = useState();
  const [signErrState, setSignErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let nationalRef = useRef();
  let passRef = useRef();

  return (
    <div style={{margin:-5}} className="min-h-screen " >
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
              // className="w-"
            >
              کد ملی
            </label>
            <input
              style={{ direction: "ltr" }}
              id="national_id"
              type="text"
              ref={nationalRef}
              className="rounded-md"
              onChange={(e) => {
                setNationalId(persianToEnglishNumber(e.target.value));
                console.log(persianToEnglishNumber(e.target.value));
              }} // Uncomment this line
            />

            <label htmlFor="password">رمز</label>
            <input
              style={{ direction: "ltr" }}
              id="password"
              type="password"
              ref={passRef}
              value={passState}
              className="rounded-md"
              onChange={(e) => setPass(e.target.value)} // Uncomment this line
            />

            {!isLoading ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  handleLoginButton();
                }}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-10"
              >
                ورود
              </button>
            ) : (
              <div className="mt-8 bg-white" role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            )}

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
    </div>
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
          return user.national_id === nationalIdState;
        });

        if (
          filteredUser.length > 0 &&
          filteredUser[0] &&
          filteredUser[0].password === passState
        ) {
          //console.log("if statement is true xxxx");

          if (
            filteredUser[0].national_id ===
            process.env.REACT_APP_ADMIN_NATIONAL_ID
          ) {
            props.onSignInAdmin();
          } else {
            props.onSignIn();
          }

          setTimeout(() => {
            //This is because we use fake api which is very fast
            setIsLoading(false);
            navigate("/home");
          }, 3000);
          setSignErr(false);
        } else {
          setSignErr(true);
        }

        setTimeout(() => {
          //This is because we use fake api which is very fast
          setIsLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setSignErr(true);
      });
  }
};

export default Login;
