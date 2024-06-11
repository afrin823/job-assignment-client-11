import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const TakeAssigment = () => {
  const item = useLoaderData();
  //console.log(item);
  const { user } = useContext(AuthContext);

  const { titleName, email, mark, name } = item;
  //console.log(mark);
  const handelTakeAssigment = (event) => {
    event.preventDefault();
    const form = event.target;
    const pdf = form.pdf.value;
    const comment = form.pdf.value;
    const title = titleName;
    const examineeEmail = user?.email;
    const examineeName = user?.displayName;
    const othorName= email;
    const othorEmail= name;
    const status = "pending";
    const givenMark = null;
    const feedBack = null;
    const infoCollection = {
      pdf,
      comment,
      title,
      examineeEmail,
      examineeName,
      status,
      givenMark,
      feedBack,
      mark,
    };

    axios
      .post("https://wish-kappa.vercel.app/bids", infoCollection)
      .then((res) => {
        if (res.data) {
          return Swal.fire({
            title: "success!",
            text: "user added succefully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((err) => {
        return Swal.fire({
          title: "error",
          text: err.message,
          icon: "error",
          confirmButtonText: "Cool",
        });
      });
  };

  return (
    <div>
      <div className="md:ml-32">
        <section className="p-6 md:w-[600px]  bg-base-300 rounded-md shadow-md flex-1 md:min-h-[350px]">
          <h1 className="text-center mt-5 mb-5 font-bold text-2xl bg-base-300">
            Assigment Submit
          </h1>
          <hr />

          <form onSubmit={handelTakeAssigment}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className=" " htmlFor="">
                  PDF/doc link
                </label>
                <input
                  id=""
                  type="text"
                  name="pdf"
                  required
                  placeholder="PDF/doc link"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className=" " htmlFor="comment">
                  Comment
                </label>

                <input
                  id="comment"
                  name="comment"
                  type="comment"
                  required
                  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <input
                className="btn"
                type="submit"
                value="Submitted Assignment"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default TakeAssigment;
