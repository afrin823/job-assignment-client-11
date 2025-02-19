import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";

const Pending = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  //console.log(user.email);
  useEffect(() => {
    axios
      .get("https://job-assignmnet-server.vercel.app/bids/pending")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  //console.log(data);
  return (
    <div>
      <section className="container px-4 mx-auto pt-12">
        <div className="flex items-center gap-x-3">
          <h2 className="text-2xl  font-bold text-gray-900 ">
            Panding Assigment
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {data.length}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border   md:rounded-lg">
                <table className="min-w-full divide-y ">
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right "
                      >
                        <div className="flex items-center  gap-x-3">
                          <span>Title</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right"
                      >
                        <span>Examnee Name</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Main Mark</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right"
                      >
                        Status
                      </th>

                      <th className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right">
                        Give Mark
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className=" ">
                    {data.map((item) => (
                      <tr key={item._id}>
                        <td className="px-4 py-4 text-sm  whitespace-nowrap">
                          {item.title}
                          <h2>MongoDB Fundamentals	</h2>
                        </td>

                        <td className="px-4 py-4 text-sm  whitespace-nowrap">
                          {item.examineeName}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <p
                              className="px-3 py-1 rounded-full bg-base-300
                             text-xs"
                            >
                              {item.mark}
                              <h3>85</h3>
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 t">
                            <span className="h-1.5 w-1.5 rounded-full"></span>
                            <h2 className="text-sm font-normal ">
                              {item.status}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <Link
                            to={`/givemark/${item._id}`}
                            title="Mark Complete"
                            className={` transition-colors duration-200   hove focus:outline-none disabled:cursor-not-allowed`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                              />
                            </svg>
                                     
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pending;
