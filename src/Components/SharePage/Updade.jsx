import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Updade = () => {
  const item = useLoaderData();
  const {
    _id,
    titleName,
    email,
    name,
    processingTime,
    mark,
    level,
    photo,
    description,
  } = item;
  // console.log(item);
  const handelUpdateAssigment = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const titleName = form.titleName.value;
    const processingTime = form.processingTime.value;
    const description = form.description.value;
    const level = form.level.value;
    const mark = form.mark.value;
    const photo = form.photo.value;
    const update = {
      email,
      name,
      titleName,
      processingTime,
      description,
      level,
      mark,
      photo,
    };
    //   console.log(update);

    fetch(`https://wish-kappa.vercel.app/assigment/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "success!",
            text: "Update Succefully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div>
      <div className="p-8">
        <h1 className="text-4xl text-center m-10 font-extrabold">
          Update Assigment : {titleName}
        </h1>
        <form onSubmit={handelUpdateAssigment}>
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
                  defaultValue={email}
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
                  defaultValue={name}
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
                  defaultValue={titleName}
                  placeholder="Title name"
                  className="input input-bordered w-full "
                />
              </label>
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Processing Time</span>
              </label>
              <label className="input-group">
                <input
                  type="date"
                  name="processingTime"
                  defaultValue={processingTime}
                  placeholder="processing time"
                  className="input input-bordered w-full "
                />
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
                  defaultValue={description}
                  placeholder="Description"
                  className="input input-bordered w-full "
                />
              </label>
            </div>
          </div>

          {/* 5*/}
          <div className="flex gap-5 mb-5">
            <div className="form-control w-full ">
              <select
                name="level"
                defaultValue={level}
                className="select select-success w-full"
              >
                <option disabled hidden selected>
                  Assignment Difficulty Level
                </option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>
          <div className="flex   mb-5">
                <div className="form-control w-full mr-5">
                  <label className="label">
                    <span className="label-text">Total Mark</span>
                  </label>
                  <label className="input-group">
                    <input
                      type="mark"
                      name="mark"
                      defaultValue={mark}
                      placeholder="Assigment Total Mark"
                      className="input input-bordered w-full "
                    />
                  </label>
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
                  defaultValue={photo}
                  name="photo"
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
  );
};

export default Updade;
