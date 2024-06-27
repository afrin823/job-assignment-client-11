import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const GiveMark = () => {
  const item = useLoaderData();

  // Log the entire item object to debug
  console.log("Loaded item:", item);

  const handleMarkSubmitted = (event) => {
    event.preventDefault();
    const form = event.target;
    const givenMark = form.givemark.value;
    const feedBack = form.feedback.value;
    const status = "completed";

    if (isNaN(givenMark) || givenMark < 0 || givenMark > 100) {
      return Swal.fire({
        title: "Error",
        text: "Please enter a valid mark between 0 and 100",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    const finalResult = {
      givenMark,
      feedBack,
      status,
    };

    console.log("Final result:", finalResult);

    axios
      .put(`http://localhost:4000/bids/${item._id}`, finalResult)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Mark has been submitted",
            icon: "success",
            confirmButtonText: "Cool",
          });
          form.reset();
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <form className="max-w-2xl mx-auto" onSubmit={handleMarkSubmitted}>
          <p className="text-3xl text-center mt-10 mb-5 font-bold text-gray-700">
            __Give Mark__
          </p>
          <hr />
          <div className="flex flex-col md:flex-row justify-center gap-5 p-4">
            <div>
              <p className="mt-2 mb-2 font-semibold">Give Mark</p>
              <input type="number" placeholder="Give Mark" name="givemark" className="input" />
            </div>
            <div>
              <p className="mt-2 mb-2 font-semibold">Feedback</p>
              <textarea
                name="feedback"
                placeholder="Enter your feedback"
                className="textarea"
              ></textarea>
            </div>
          </div>
          <div className="text-center">
            <input className="btn" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveMark;
