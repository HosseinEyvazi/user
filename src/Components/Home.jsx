const Home = () => {
  return (
    <div className="h-screen" style={{marginTop:-5 , background:"transparent"}}>
      <h2 className="m-4 font-extrabold ">خانه</h2>
      <div className=" flex flex-col items-center justify-center content-center ">
        <h2 className="font-extrabold ">
          Home page for users. instead of this component : adminHome for
          adminstrator (using private route) .adminHome is list of the users
        </h2>
      </div>
    </div>
  );
};

export default Home;
