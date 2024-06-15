import { useContext } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";

const Vew = () => {
  const { user } = useContext(AuthContext);
  const items = useLoaderData();
  const { _id } = useParams();
  const singleData = items?.find((i) => i._id == _id);
  // console.log(singleData);
  return (
    <div>
      <div className="mt-5 mb-5">
        <h1 className="font-extrabold text-3xl md:text-5xl lg:text-5xl mx-auto items-center text-center text-gray-500 mt-10 mb-10">
          __Views__
        </h1>
        <div className="flex items-center">
          <div className="flex flex-col md:flex-row justify-around bg-base-300 gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
            {/* Job Details */}
            <div className="flex-1  px-4 py-7  rounded-md shadow-md md:min-h-[350px]">
         
              <div>
               
                <div className="w-full h-full mt-3 mb-10">
                  <img
                    className="rounded-md w-full h-[300px]"
                    src={singleData?.photo}
                    alt=""
                  />
                </div>
                <h1 className="mt-2 text-3xl font-semibold  ">
                  {singleData.titleName}
                </h1>

                <div className="flex justify-between mt-2 gap-10">
                <span className="text-sm font-light text-green-700">
                  Deadline: 12/08/2024
                </span>
                <span className="text-sm font-light text-blue-800">
                  Total Mark: {singleData?.mark}
                </span>
                <span className="px-4 py-1 text-xs text-green-800 uppercase bg-green-200 rounded-full ">
                  {singleData?.level}
                </span>
              </div>
               
                <div className="flex items-center gap-5">
                  <div>
                    <p className="mt-2 text-xl text-rose-400">
                      Name: {singleData?.name}.
                    </p>
                    <p className="mt-2 text-xl   text-rose-400">
                      Email: {singleData?.email}
                    </p>
                    <p className="mt-2 text-base text-gray-600">
                  {singleData?.description}
                </p>
                  </div>
                  
                </div>
                <div className="mt-3">
                  <Link to={`/takeassigment/${singleData?._id}`}>
                    <button className="btn ">Take Assigment</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vew;
