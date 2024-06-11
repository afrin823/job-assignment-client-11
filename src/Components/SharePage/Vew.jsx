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
        <h1 className="font-extrabold text-3xl md:text-5xl lg:text-5xl mx-auto items-center text-center mt-10 mb-10">
          Views
        </h1>
        <div className="flex items-center">
          <div className="flex flex-col md:flex-row justify-around bg-base-300 gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
            {/* Job Details */}
            <div className="flex-1  px-4 py-7  rounded-md shadow-md md:min-h-[350px]">
              <div className="flex gap-10">
                <span className="text-sm font-light  ">
                  Deadline: 12/08/2024
                </span>
                <span className="text-sm font-light  ">
                  Total Mark: {singleData?.mark}
                </span>
                <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
                  {singleData?.level}
                </span>
              </div>

              <div>
                <h1 className="mt-2 text-3xl font-semibold  ">
                  {singleData.titleName}
                </h1>
                <div className=" mt-3 mb-10">
                  <img
                    className="rounded-md h-[300px]"
                    src={singleData?.photo}
                    alt=""
                  />
                </div>

                <p className="mt-2 text-lg  ">
                  {singleData?.description}
                </p>
                {/* <p className="mt-6 text-sm font-bold  ">
              Buyer Details:
            </p> */}
                <div className="flex items-center gap-5">
                  <div>
                    <p className="mt-2 text-sm   ">
                      Name: {singleData?.name}.
                    </p>
                    <p className="mt-2 text-sm   ">
                      Email:{singleData?.email}
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
