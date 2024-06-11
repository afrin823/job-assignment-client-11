import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const GiveMark = () => {
  const item = useLoaderData();

  const handelMarkSubmited = (event) => {
    event.preventDefault();
    // console.log("click");
    const form = event.target;
    const givenMark = form.givemark.value;
    const feedBack = form.feedback.value;
    const status = "completed";
    //console.log(givemark,feedback);
    const finalResult = {
      givenMark,
      feedBack,
      status,
    };

    axios
      .put(`https://wish-kappa.vercel.app/bids/${item._id}`, finalResult)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          return Swal.fire({
            title: "success!",
            text: "Give Mark",
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
    <div className="">
      <div className="">
        <form className="max-w-2xl mx-auto" onSubmit={handelMarkSubmited}>
          <p className="text-3xl text-center mt-10 mb-5 font-bold bg-base-300">
            {" "}
            Give Mark
          </p>{" "}
          <hr />
          <div className="flex flex-col md:flex-row justify-center gap-5 p-4">
            <div>
              <p className="mt-2 mb-2 font-semibold">Give Mark</p>
              <input type="number" placeholder="Give Mark" name="givemark" />
            </div>
            <div>
              <p className="mt-2 mb-2 font-semibold">Feedback</p>
              <textarea
                name="feedback"
                id=""
                placeholder="text area"
              ></textarea>
            </div>
          </div>
          <div className="text-center">
            <input className="btn " type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveMark;
