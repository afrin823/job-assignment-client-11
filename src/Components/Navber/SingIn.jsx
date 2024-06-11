import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import Swal from "sweetalert2";
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import axios from "axios";
import logo from '../../../public/login.jpg'

const SingIn = () => {
  const [signinError, setSigninError] = useState("");
  const [singinSuccesfull, setSinginSuccesfull] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newError, setNewErrot] = useState("");
  const [newErrorpassword, setNewErropassword] = useState("");
  const location = useLocation();
  // console.log(location);

  //-----------------

  const { signInUser, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);
  const navigate = useNavigate();
  //-----------------------------

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    // console.log(password.length);

    if (email.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "please type your email",
      });
      setNewErrot("please type your email");
      return;
    }
    setNewErrot("");

    //-----------------------------------------
    setSigninError("");
    setSinginSuccesfull("");

    //--------------------------

    signInUser(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        //jwt kaj start
        const user = { email };

        axios
          .post("http://localhost:5000/jwt", user, { withCredentials: true })

          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              navigate(location?.state ? location?.state : "/");
            }
          });

        // e.target.reset();
        Swal.fire({
          title: "signIn Successfull",
          text: "User Succesfully SignIn",
          icon: "success",
        });
        // navigate(location?.state ? location.state : "/");
        setSinginSuccesfull("Succesfully SignIn ");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        setSigninError(error.message);
      });
  };
  //-----------------------------

  const handleGooglrSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        navigate(location?.state ? location.state : "/");
        //  console.log(result.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  //-----------------------------------
  const handleGitHubSignIn = () => {
    signInWithGithub()
      .then((result) => {
        navigate(location?.state ? location.state : "/");
        // console.log(result.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <div className="hero mt-5 mb-5 md:rounded-2xl flex justify-center flex-col md:flex-row-reverse border ">
        <div>
          <img
            className="w-full h-full"
            src={logo}
            alt=""
          />
        </div>
        <div className="hero-content flex-col">
          <div className="card shrink-0  md:w-[600px] lg:w-[600px] shadow-2xl bg-base-100">
            <form onSubmit={handleSignIn} className="card-body">
              <h1 className="text-center text-3xl font-bold">Sing In!</h1>
              <div className="form-control font-semibold">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  required
                  className="input input-bordered"
                />
                <p className="text-red-500">{newError}</p>
              </div>

              <div className="form-control font-semibold relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  required
                  className="input input-bordered"
                />
                <p className="text-red-500">{newErrorpassword}</p>
                <span
                  className="absolute top-3 right-8 mt-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <GoEyeClosed /> : <FiEye />}
                </span>

                <label className="label font-semibold">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn  text-2xl font-semibold btn-primary">
                  Login
                </button>
              </div>
            </form>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGooglrSignIn}
                aria-label="Log in with Google"
                className="p-3 rounded-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
              </button>

              <button
                onClick={handleGitHubSignIn}
                aria-label="Log in with GitHub"
                className="p-3 rounded-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                </svg>
              </button>
            </div>

            {signinError && (
              <p className="text-red-700 text-xl p-4 text-center font-semibold">
                {signinError}
              </p>
            )}
            {singinSuccesfull && (
              <p className="text-green-700 text-xl p-4 text-center font-semibold">
                {singinSuccesfull}
              </p>
            )}

            <p className="text-center text-xl p-4 mb-3">
              New Here? Please Register
              <Link to="/signup">
                <button className="btn text-xl btn-link">Sign Up</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
