import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import axios from "axios";

const MyAttempted = () => {
  const [userdata, setUserData] = useState([]);

  const { user } = useContext(AuthContext);

  // console.log(userdata);
  useEffect(() => {
    axios
      .get(`https://wish-kappa.vercel.app/bid/${user?.email}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        return Swal.fire({
          title: "error",
          text: err.message,
          icon: "error",
          confirmButtonText: "Cool",
        });
      });
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5 mb-5 font-bold text-2xl bg-base-300">
        My Attempted Assignment Page
      </h1>
      <hr />
      <section className="container px-4 mx-auto pt-12">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg  font-medium  ">My Assigment:</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {userdata.length}
          </span>
        </div>

        <div className="flex flex-row mb-5  md:flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border   md:rounded-lg">
                <table className="min-w-full divide-y ">
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right "
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Title</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right "
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Examinee Email</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right "
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Examinee name</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        <button className="flex items-center gap-x-2">
                          <span>assignment marks</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        My Obtained Marks
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Assignment Status
                      </th>

                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" divide-y  ">
                    {userdata.map((item) => (
                      <tr key={item._id}>
                        <td className="px-4 py-4 text-sm   whitespace-nowrap">
                          {item.title}
                        </td>
                        <td className="px-4 py-4 text-sm   whitespace-nowrap">
                          {item.examineeEmail}
                        </td>
                        <td className="px-4 py-4 text-sm   whitespace-nowrap">
                          {item.examineeName}
                        </td>

                        <td className="px-4 py-4 text-sm   whitespace-nowrap">
                          {item.mark}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <p
                              className="px-3 py-1 rounded-full  bg-blue-100/60
         text-xs"
                            >
                              {item.givenMark}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 bg-yellow-500 te">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                            <h2 className="text-sm font-normal ">
                              {item.status}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <p
                              className="px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
         text-xs"
                            >
                              {item.feedBack}
                            </p>
                          </div>
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

export default MyAttempted;
