import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";


const Navber = () => {
  //--------------------
  const { user, logOut } = useContext(AuthContext);
  //--------------------------
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("synthwave");
    } else {
      setTheme("light");
    }
  };
  // console.log(theme);
  //--------------------

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // console.log("user log Out succefully");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // console.log(user);
  // //------------------------

  const links = (
    <div className=" flex md:flex-row flex-col font-semibold mt-5">
      <NavLink className="mr-5" to="/">
        Home
      </NavLink>
      <NavLink className="mr-5" to="/assigment">
        Assignments
      </NavLink>

      {user && (
        <>
          <NavLink className="mr-5" to="/createassigment">
            Create Assignments
          </NavLink>
          <NavLink className="mr-5" to="/pendingassigment">
            Pending Assignments
          </NavLink>
        </>
      )}
      <NavLink className="mr-5" to="/contact">
        ContactUs
      </NavLink>
      <NavLink className="mr-5" to="/signin">
        login
      </NavLink>
      <NavLink className="mr-5" to="/about">
        AboutUs
      </NavLink>
    </div>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mt-0 ">
      <div className="dropdown ">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
        >
          {links}
        </ul>
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <img className="w-32" src="https://i.ibb.co/T8M7fx6/assignment-sign-assignment-round-ribbon-sticker-assignment-tag-2-AT4-RJD-removebg-preview.png" alt="" />
       

          
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar tooltip tooltip-top"
            data-tip={user?.displayName}
          >
            <div className="w-10 rounded-full" title="">
              <img
                referrerPolicy="no-referrer"
                alt="User Profile Photo"
                src={user?.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user && (
              <>
                <NavLink
                  to="/profile"
                  className="justify-between mt-2 font-semibold"
                >
                  My Profile
                </NavLink>
                <NavLink to="/mysubmitted" className="mt-2 font-semibold">
                  My Attempted Assignments
                </NavLink>
              </>
            )}

            <NavLink to="/signup" className=" mt-2 font-semibold">
              <button onClick={handleLogOut}>Logout</button>
            </NavLink>
          </ul>
          {/* dark light start  */}

          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              onChange={handleToggle}
              type="checkbox"
              className="toggle theme-controller"  value="synthwave" 
              // value="synthwave"
            />
          </label>

          {/* dark light end  */}
        </div>
      </div>
    </div>

  );
};

export default Navber;
