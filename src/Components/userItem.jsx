

const UserItem = ({avatar ,sex , city , date , national_id , military , family , name }) => {
  return (
    <div className="rounded-3xl">
      <div
        className="p-3 flex flex-row items-center bg-gray-100 rounded-3xl m-2"
        
      >
        <img
          src={avatar}
          alt="عکس ندارد"
          width={130}
          height={130}
          className="outline-blue-100  mr-8 rounded-3xl border-blue-200 border-2 shadow-black shadow-lg"
        />

        <div className="p-6 bg-gray-100  shadow-black shadow-lg rounded-3xl m-4">
          <h2 className="text-black mb-2 font-extrabold">
            {"نام و نام خانوادگی: " + family + "  " +name}
          </h2>
          <h1>{"وضعیت خدمت: " + military}</h1>
          <h1>{"کد ملی: " + national_id}</h1>
          <h1>{"تاریخ تولد: " +date}</h1>
          <h1>{"شهر: " + city}</h1>
          <h1>{"جنسیت: " + (sex === "Female" ? "خانم" : "اقا")}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
