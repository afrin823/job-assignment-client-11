import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loading from '../../../public/grey_style.gif'
import TypeWriter from "../TypeWrriter/TypeWriter";

const Feature = () => {
  const [data, setdata] = useState([]);
  const [limit, setLimit] = useState(6);
  useEffect(() => {
    fetch(`http://localhost:4000/assigment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        //  console.log(data);
        setdata(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (!data.length) {
    return <div className="flex justify-center h-screen items-center"><img className="w-20" src={loading} alt="" /></div>
  }
  return (
    <div className="mt-5 mb-5">
    <div className="text-3xl text-center text-gray-500  font-bold mb-5">
      <TypeWriter></TypeWriter>
    </div>
      <div>
        <div className=" mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {data?.slice(0, limit).map((item) => {
            return (
              <div className="w-full" key={item?._id}>
                <div className="w-full h-full max-w-sm px-6 py-3 bg-base-300 rounded-md shadow-md hover:scale-[1.05] transition-all">
              

                  <div>
                  
                    <div className=" mt-3 mb-10 h-[200px]">
                      <img className="rounded-md w-full h-full" src={item?.photo} alt="" />
                    </div>
                    <h1 className="mt-2 text-lg font-semibold  ">
                      {item?.titleName}
                    </h1>
                    
                    <div className="flex items-center justify-between">
                    <span className="text-xs font-light  ">
                      Deadline: {item?.processingTime}
                    </span>
                    <span className="text-xs font-light  ">
                      Total Mark: {item?.mark}
                    </span>
                    <span className="px-3 py-1 text-red-800 uppercase bg-red-200 rounded-full ">
                      {item?.level}
                    </span>
                  </div>

                    <p className="mt-2 text-sm  ">
                      {item?.description.slice(0, 90)}
                    </p>
                    <div className="flex gap-5 mt-3">
                      <Link to={`/ditels/${item?._id}`}>
                        <button className="btn btn-outline btn-error">Click Me</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feature;
