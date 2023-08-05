import { useState, useEffect } from "react";
import axios from "axios";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const News = () => {
  const [newsState, setNews] = useState([]);
  //console.log("XX"+newsState==true);
  useEffect(() => {
    setTimeout(() => {
      // Because it doesnt take time to load data from fake API(fake API is a package)
      axios
        .get(process.env.REACT_APP_GET_NEWS_URL)
        .then((resp) => {
          setNews(resp.data);
          //console.log(resp.data);
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
        {tempArr.map((val, index) => (
          <div className=" animate-ease-in flex bg-gray-200 p-3 mt-3 flex-row items-center rounded-3xl mr-3">
            <SkeletonTheme key={index}  highlightColor="#708090"> 
              <Skeleton style={{borderRadius : 24}} height={130} width={130} className="border-blue-100 border-2 outline-blue-100 shadow-black shadow-lg rounded-3xl mr-4" />
              <div className=" flex-col w-full ">
                
                <Skeleton height={220} style={{borderRadius : 24 }} className=" mb-4  mr-4 rounded-3xl  outline-blue-100 shadow-black shadow-lg border-blue-100 border-2"  />
                
              </div>
            </SkeletonTheme>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
    <h4 className="m-4 font-extrabold ">اخبار</h4>
      {newsState.length === 0
        ? skeletonLoading()
        : newsState.map((oneNews, index) => (
            <div className="p-3 flex flex-row items-center bg-gray-100 rounded-3xl m-2">
              <img  src={oneNews.img} alt="reload page" width={130} height={130} className="outline-blue-100  mr-8 rounded-3xl border-blue-200 border-2 shadow-black shadow-lg" />

              <div
                key={index}
                className=" p-6 bg-gray-100  shadow-black shadow-lg rounded-3xl m-4"
              >
                <h2 className="text-black mb-2 font-extrabold">
                  {oneNews.title}
                  
                </h2>
                <h1>{oneNews.content}</h1>
              </div>
            </div>
          ))}
    </>
  );
};

export default News;
