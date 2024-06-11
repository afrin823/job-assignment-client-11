import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { GoEyeClosed } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import logo from '../../../public/login.jpg'
import { useContext, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Resister = () => {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, settermsError] = useState("");

  const [signupError, setSignupError] = useState("");

  const [singupSuccesfull, setSingupSuccesfull] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //-------------------------------
  const { createUser, auth, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);
  const navigate = useNavigate();
  //---------------------------------
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    const accepted = form.terms.checked;
    // console.log(name, email, photoURL, password);
    //------------------------

    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please type your name",
      });
      setNameError("Please type your name");
      return;
    }
    setNameError("");

    if (email.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please type your email",
      });
      setEmailError("Please type your email");
      return;
    }
    setEmailError("");

    if (password.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please type 6 character Password",
      });
      setPasswordError("Please type 6 character Password");
      return;
    } else if (!/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "your password should have at least one upper, one lower case & must 6charactor ",
      });
      setPasswordError(
        "your password should have at least one upper, one lower case & must 6charactor "
      );
      return;
    }
    setPasswordError("");

    if (!accepted) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "please accept our conditions",
      });
      settermsError("please accept our conditions");
      return;
    }
    settermsError("");

    //-------------------------
    setSignupError("");
    setSingupSuccesfull("");

    //-------------------------
    createUser(email, password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch(() => {
            // An error occurred
            // ...
          });

        //  console.log(result.user);
        e.target.reset();
        Swal.fire({
          title: "signUp Successfull",
          text: "Created Succesfully SignUp",
          icon: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email Already In Use",
        });
      });
  };
  //----------------------------
  const handleGooglrSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        navigate(location?.state ? location.state : "/");
        console.log(result.user);
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
      <div className="hero flex justify-center flex-col md:flex-row gap-5 items-center md:p-6">
        <div className="">
          <img
            className="w-full h-full"
            src={logo}
            alt=""
          />
        </div>
        <div className="hero-content flex-col">
          <div className="card shrink-0  md:w-[600px] lg:w-[600px]  shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <h1 className="text-center text-3xl font-bold ">Sing Up!</h1>
              <div className="form-control font-semibold">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="Name"
                  placeholder="Name"
                  name="name"
                  required
                  className="input input-bordered"
                />
                <p className="text-red-500">{nameError}</p>
              </div>

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
                <p className="text-red-500">{emailError}</p>
              </div>

              <div className="form-control font-semibold">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="photoURL"
                  name="photoURL"
                  placeholder="photoURL"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control font-semibold relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered "
                />
                <p className="text-red-500">{passwordError}</p>

                <span
                  className="absolute top-3 right-8 mt-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <GoEyeClosed /> : <FiEye />}
                </span>
              </div>
              <br />

              <div className="pl-4 font-semibold">
                <input type="checkbox" name="terms" id="terms" />
                <label className="ml-2" htmlFor="terms">
                  Accept Our Terms & Conditions
                </label>
                <p className="text-red-500">{termsError}</p>
              </div>
              <br />
              <div className="form-control text-2xl font-semibold ">
                <button className="btn text-2xl font-semibold btn-primary">
                  Register
                </button>
              </div>
            </form>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGooglrSignIn}
                aria-label="Log in with Google"
                className=" rounded-sm"
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
                className="pl-2 rounded-sm"
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

            {signupError && (
              <p className="text-red-700 text-xl p-4 text-center font-semibold">
                {signupError}
              </p>
            )}
            {singupSuccesfull && (
              <p className="text-green-700 text-xl p-4 text-center font-semibold">
                {singupSuccesfull}
              </p>
            )}

            <p className="text-center text-xl p-2">
              Already Have Account? Please
              <Link to="/signin">
                <button className="btn text-xl btn-link">Sign In</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resister;
