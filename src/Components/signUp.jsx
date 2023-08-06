import { useEffect, useRef, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
//import { Link, useHistory } from "react-router-dom"; // Import useHistory directly from react-router-dom
import { ltr } from "semver";
import * as yup from "yup";
import ImageUploader from "./imageUploader";
import axios from "axios";
import DatePickerr from "./datePicker";
import Combo from "../combo";
const SignUp = (props) => {
  const navigate = useNavigate();
  const iranProvinces = [
    "البرز",
    "اردبیل",
    "بوشهر",
    "چهارمحال و بختیاری",
    "آذربایجان شرقی",
    "اصفهان",
    "فارس",
    "گیلان",
    "گلستان",
    "هرمزگان",
    "ایلام",
    "کرمان",
    "کرمانشاه",
    "خراسان شمالی",
    "خراسان رضوی",
    "خراسان جنوبی",
    "خوزستان",
    "کهگیلویه و بویراحمد",
    "کردستان",
    "لرستان",
    "مرکزی",
    "مازندران",
    "قزوین",
    "قم",
    "سمنان",
    "سیستان و بلوچستان",
    "تهران",
    "آذربایجان غربی",
    "یزد",
    "زنجان",
  ];

  let [fieldsState, setFields] = useState({
    name: "",
    family: "",
    nationalId: "",
    city: "",
    military: "",
    sex: "",
    password: "",
    passwordRepeated: "",
    email: "",
    avatar: "",
    date: "",
  });

  const [errsState, setErrs] = useState(["x"]); //"" has a reason
  //const [x , setX] = useState({})     //todo delete this line
  useEffect(() => {
    console.log(fieldsState);
  });

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("فیلد ایمیل الزامی است!")
      .email("ایمیل را بدرستی وارد کنید"),
    name: yup.string().strict().required("فیلد نام الزامی است!"),

    family: yup
      .string("نام خانوادگی و فاقد عدد")
      .strict(true)
      .required("نام خانوادگی الزامی است"),

    nationalId: yup
      .string()
      .matches(/^[0-9]{10}$/, " نمیتواند شامل حروف باشد")
      .required("کد ملی الزامی است"),
    city: yup.string(),

    military: yup.string().required("وضعیت سربازی الزامی است"),

    sex: yup.string().required("جنسیت الزامی است "),

    password: yup
      .string()
      .required("رمز الزامی است")
      .min(4, "رمز حداقل ۴ کاراکتر"),
    passwordRepeated: yup
      .string()
      .required("تکرار رمز الزامی است")
      .oneOf([yup.ref("password"), null], "تکرار رمز مطابق با رمز نیست!"),
  });

  return (
    <div className="flex flex-col items-center justify-center  h-full">
      <div className="animate-fade-left w-2/6 bg-blue-100 mt-7 mb-9  px-60 py-8 rounded-3xl shadow-black shadow-2xl flex justify-center items-center">
        <form className="flex flex-col items-center content-center">
          <ImageUploader onImageChange={onImageChange} />

          <label htmlFor="name">نام</label>
          <input
            onChange={(e) => handleNameInput(e)}
            value={fieldsState.name}
            id="name"
            type="text"
            className="mb-4 rounded-md  "
          />

          <label htmlFor="family">نام خانوادگی</label>
          <input
            value={fieldsState.family}
            type="text"
            className="mb-4 rounded-md"
            onChange={(e) => handleFamilyInput(e)}
          />

          <label htmlFor="national_id">کد ملی</label>
          <input
            style={{ direction: "ltr" }}
            className="mb-4 rounded-md"
            type="number"
            id="national_id"
            value={fieldsState.nationalId}
            onChange={(e) => handleNationalIDInput(e)}
          />
          <label htmlFor="">تاریخ تولد</label>
          <DatePickerr
            chosenDate={fieldsState.date}
            handleDateInput={handleDateInput}
          />

          <label htmlFor="city">شهر</label>
          <Combo inputHandler={handleCityInput} items={iranProvinces}>
            ...
          </Combo>
          <label htmlFor="email">ایمیل</label>
          <input
            onChange={(e) => handleEmailInput(e)}
            value={fieldsState.email}
            className="mb-4 rounded-md"
            type="email"
            id="email"
            style={{ direction: "ltr" }}
          />

          <label htmlFor="sex">جنسیت</label>
          <div>
            <label htmlFor="sex">مرد</label>
            <input
              className="ml-7"
              type="radio"
              value="Male"
              name="sex"
              onChange={(e) => handleSexInput(e)}
            />
            <label htmlFor="sex">زن</label>
            <input
              onChange={(e) => handleSexInput(e)}
              type="radio"
              value="Female"
              //  ref={sexRadioRef}
              name="sex"
            />
          </div>
          {fieldsState.sex !== "Female" ? (
            <>
              <div className="m-4">
                <p>
                  وضعیت سربازی
                  <br />
                </p>
                <label htmlFor="military">بله</label>

                <input
                  className="ml-7"
                  type="radio"
                  value="yes"
                  name="military"
                  onChange={(e) => handleMilitaryInput(e)}
                />
                <label htmlFor="military">خیر</label>

                <input
                  onChange={(e) => handleMilitaryInput(e)}
                  type="radio"
                  value="no"
                  name="military"
                  // ref={militaryFalseRadioRef}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <label htmlFor="name">رمز</label>
          <input
            id="password"
            type="password"
            className="mb-4 rounded-md"
            value={fieldsState.password}
            onChange={(e) => handlePasswordInput(e)}
            style={{ direction: ltr }}
          />
          <label htmlFor="password_repeat">تکرار رمز</label>
          <input
            id="password_repeat"
            type="password"
            className="mb-4 rounded-md"
            value={fieldsState.passwordRepeated}
            style={{ direction: ltr }}
            onChange={(e) => handleRepPasswordInput(e)}
          />

          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-10"
            onClick={(e) => {
              e.preventDefault();
              validation();
              console.log(errsState.length);
              console.log(errsState);

              setTimeout(() => {
                //because changing state need more time
                if (errsState.length === 0) {
                  console.log("xxx " + errsState);
                  sendDataToServer(); //then navigate (Link element is in App.js)
                }
              }, 200);
            }}
          >
            ثبت اطلاعات
          </button>
          <Link className="text-black  mt-2 underline " to={"/login"}>
            قبلا عضو شده اید؟{" "}
          </Link>
          {errsState.length !== 0 ? (
            errsState.map((err) => <p className="text-red-500">{err}</p>)
          ) : (
            <div></div>
          )}
        </form>
      </div>
    </div>
  );

  function isValidIranianNationalCode(nationalID) {
    nationalID = nationalID.toString();
    if (!/^\d{10}$/.test(nationalID)) return false;
    const check = +nationalID[9];
    const sum =
      nationalID
        .split("")
        .slice(0, 9)
        .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
  }
  function validation() {
    let tempErr = []; // this will be all yup errs + national id validation
    validationSchema
      .validate(fieldsState, { abortEarly: false })
      .then(() => {
        // No errors, so reset the tempErr
        tempErr = [];
        setErrs([]);
      })
      .catch((errs) => {
        tempErr = [];
        if (fieldsState.nationalId.length === 0) {
          tempErr.push("کد ملی الزامی است!");
        } else if (!isValidIranianNationalCode(fieldsState.nationalId)) {
          tempErr.push("کد ملی صحیح نیست!");
        }
        if (fieldsState.sex.length === 0) {
          tempErr.push("جنسیت را وارد کنید");
        } else if (
          fieldsState.sex === "Male" &&
          fieldsState.military.length === 0
        ) {
          tempErr.push("وضعیت سربازی را وارد کنید !");
        }

        // Use errs.errors directly, as it's an array
        setErrs([...tempErr, ...errs.errors]);
      });
  }

  //all handlers
  function handleEmailInput(e) {
    setFields({ ...fieldsState, email: e.target.value });
  }

  function handleNameInput(e) {
    setFields({ ...fieldsState, name: e.target.value });
  }

  function handleFamilyInput(e) {
    setFields({ ...fieldsState, family: e.target.value });
  }

  function handleNationalIDInput(e) {
    setFields({ ...fieldsState, nationalId: e.target.value });
  }

  function handleCityInput(text) {
    setFields({ ...fieldsState, city: text });
  }
  function handleSexInput(e) {
    if (e.target.value === "Female") {
      // When sex is set to Female, also set the military state to "no"
      setFields(() => ({
        ...fieldsState,
        sex: e.target.value,
        military: "no",
      }));
    } else {
      // For Male, just update the sex state
      setFields(() => ({
        ...fieldsState,
        sex: e.target.value,
        military: "",
      }));
    }
  }

  function handleMilitaryInput(e) {
    setFields(() => ({ ...fieldsState, military: e.target.value }));
  }
  function handleRepPasswordInput(e) {
    setFields({ ...fieldsState, passwordRepeated: e.target.value });
  }

  function handlePasswordInput(e) {
    setFields({ ...fieldsState, password: e.target.value });
  }

  function handleDateInput(date) {
    setFields({ ...fieldsState, date: date });
  }

  function onImageChange(base64) {
    //as a props to imageUploader comp
    setFields({ ...fieldsState, avatar: base64 });
    console.log("base64 : " + base64);
  }
  function sendDataToServer() {
    axios
      .post(process.env.REACT_APP_GET_USERS_URL, fieldsState, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        //setX(res.data)
        console.log("axios success (data sent suc) : " + res.data);
        props.onSignIn();
        navigate("/home");
      })
      .catch((err) => console.log("axios err :" + err));
  }
};

export default SignUp;
