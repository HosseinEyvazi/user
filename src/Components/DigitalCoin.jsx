import { useNavigate } from "react-router-dom";

const DigitalCoin = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="m-4 font-extrabold ">اخبار ارز دیجیتال</h2>
      <div className=" flex flex-col items-center justify-center content-center ">
        <h2 className="font-extrabold ">
          this is digital coin . page available only for sigend in users or
          admin . a user that not signed in will navigate to login page
        </h2>
      </div>
      {setTimeout(() => {
        navigate("/login");
      }, 4000)}
    </>
  );
};

export default DigitalCoin;
