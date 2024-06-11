import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";


const Profile = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  return (
    <div>
      <div>
        <section className="p-6 mt-5 mb-5">
          <div className="">
            <p className="text-4xl font-bold text-center">
              Personal Information
            </p>
          </div>

          <div className="grid col-span-1 md:grid-cols-2 gap-5 items-center p-6 max-w-3xl mx-auto">
            <div className="">
              <div className=" ">
                <img
                  data-aos="zoom-in"
                  data-aos-duration="1700"
                  className="rounded-full  md:w-[300px] md:h-[300px] shadow-lg border  hover:shadow-red-300 "
                  src={user.photoURL}
                  alt="photp"
                />
              </div>
              <div className=" items-center mt-5"></div>
            </div>
            <div className="font-semibold text-xl">
              <form className="container flex flex-col  mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
                  <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="form-control col-span-full">
                      <label className="label ">
                        <span
                          data-aos="fade-left"
                          data-aos-delay="2000"
                          className="label-text text-xl font-semibold"
                        >
                          Name
                        </span>
                      </label>
                      <input
                        data-aos="fade-left"
                        data-aos-delay="2100"
                        defaultValue={user.displayName}
                        className=" w-full border  rounded-md focus:ring focus:ring-opacity-75 "
                      />
                    </div>
                    <div className="form-control col-span-full">
                      <label className="label ">
                        <span
                          data-aos="fade-left"
                          data-aos-delay="2200"
                          className="label-text text-xl font-semibold"
                        >
                          Email
                        </span>
                      </label>
                      <input
                        data-aos="fade-left"
                        data-aos-delay="2300"
                        defaultValue={user?.email}
                        className=" w-full border  rounded-md focus:ring focus:ring-opacity-75  "
                      />
                    </div>
                    <div className="col-span-full">
                      <label
                        data-aos="fade-left"
                        data-aos-delay="2400"
                        htmlFor="email"
                        className=""
                      >
                        Photo URL
                      </label>
                      <input
                        data-aos="fade-left"
                        data-aos-delay="2500"
                        defaultValue={user.photoURL}
                        className="w-full border  rounded-md focus:ring focus:ring-opacity-75 "
                      />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
