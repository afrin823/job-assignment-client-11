import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { GoEyeClosed } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import logo from '../../../public/login.jpg'
import { useContext, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { BsGithub } from "react-icons/bs";

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
  
        <div className="hero-content flex-col">
          <div className="card shrink-0  md:w-[600px] lg:w-[600px]  shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <h1 className="text-center text-3xl font-bold ">__Sing Up__</h1>
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
                <button className="btn text-xl font-semibold bg-[#3498db] text-white">
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
              <img className="w-8" src="https://i.ibb.co/dQs5hVM/Logo-google-icon-PNG-removebg-preview-1.png"  alt="" />
              </button>

              <button
                onClick={handleGitHubSignIn}
                aria-label="Log in with GitHub"
                className="pl-2 rounded-sm text-3xl"
              >
                <BsGithub />
              </button>
            </div>
            <p className="text-center text-base p-2">
              Already Have Account? Please
              <Link to="/signin">
                <button className="btn text-base btn-link">Sign In</button>
              </Link>
            </p>

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

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resister;
