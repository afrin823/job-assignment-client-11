import { useContext, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CreateAssigment = () => {
  const { user } = useContext(AuthContext);
  const [data, setdata] = useState([]);
  const email = data?.filter((e) => e.email === user.email);
  const [startDate, setStartDate] = useState(new Date());

  //console.log(user.email);

  const handelAddAssigment = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const titleName = form.titleName.value;
    const processingTime =startDate ;
    const description = form.description.value;
    const level = form.level.value;
    const mark = form.mark.value;
    const photo = form.photo.value;
    const newAdd = {
      email,
      name,
      titleName,
      processingTime,
      description,
      level,
      mark,
      photo,
    };
    //  console.log(newAdd);

    fetch("https://wish-kappa.vercel.app/assigment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newAdd),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "success!",
            text: "user added succefully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div>
      <div>
        <div className="p-8">
          <h1 className="text-4xl text-center m-10 font-extrabold">
            Create Assigment
          </h1>
          <form onSubmit={handelAddAssigment}>
            {/* 1  */}
            <div className="flex  mb-5">
              <div className="form-control w-full mr-5">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <label className="input-group">
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    disabled
                    placeholder="email"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <label className="input-group">
                  <input
                    type="name"
                    name="name"
                    defaultValue={user?.displayName}
                    disabled
                    placeholder="your name"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>
            </div>
            {/* 2  */}
            <div className="flex  mb-5">
              <div className="form-control w-full mr-5">
                <label className="label">
                  <span className="label-text">Title Name</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="titleName"
                    placeholder="Title name"
                    required
                    className="input input-bordered w-full "
                  />
                </label>
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Processing Time</span>
                </label>
                <label className="input-group">
                  {/* <input
                    type="date"
                    required
                    name="processingTime"
                    placeholder="processing time"
                    className="input input-bordered w-full "
                  /> */}
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </label>
              </div>
            </div>
            {/* 3 */}
            <div className="flex   mb-5">
              <div className="form-control w-full mr-5">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="description"
                    required
                    placeholder="Description"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>
            </div>

            {/* 5*/}
            <div className=" gap-5 mb-5">
              <div className="form-control w-full ">
                <select name="level" className="select select-success w-full">
                  <option disabled hidden selected>
                    Assignment Difficulty Level
                  </option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div className="flex   mb-5">
                <div className="form-control w-full mr-5">
                  <label className="label">
                    <span className="label-text">Total Mark</span>
                  </label>
                  <label className="input-group">
                    <input
                      type="number"
                      name="mark"
                      required
                      placeholder="Assigment Total Mark"
                      className="input input-bordered w-full "
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* 6*/}

            <div className="mb-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Thumbnail Image URL</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="photo"
                    required
                    placeholder="photo"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>
            </div>

            <input
              type="submit"
              value="Add Assigment"
              className="btn btn-block"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssigment;
