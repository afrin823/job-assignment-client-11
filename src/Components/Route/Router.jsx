import { createBrowserRouter } from "react-router-dom";
import MainPart from "./MainPart";
import Home from "../Home/Home";
import Error from "../Error";
import SingIn from "../Navber/SingIn";
import Resister from "../Navber/Resister";
import About from "../Navber/About";
import Contact from "../Navber/Contact";
import CreateAssigment from "../Navber/CreateAssigment";
import PrivateRoute from "../Firebase/PrivetRoute";
import Assigment from "../Navber/Assigment";
import MyAttempted from "../Navber/MyAttempted";
import Pending from "../Navber/Pending";
import Vew from "../SharePage/Vew";
import Updade from "../SharePage/Updade";
import TakeAssigment from "../SharePage/TakeAssigment";
import GiveMark from "../SharePage/GiveMark";
import Profile from "../Navber/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPart></MainPart>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SingIn></SingIn>,
      },
      {
        path: "/signup",
        element: <Resister></Resister>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/createassigment",
        element: (
          <PrivateRoute>
            <CreateAssigment></CreateAssigment>
          </PrivateRoute>
        ),
      },
      {
        path: "/mysubmitted",
        element: (
          <PrivateRoute>
            <MyAttempted></MyAttempted>
          </PrivateRoute>
        ),
      },
      {
        path: "/pendingassigment",
        element: (
          <PrivateRoute>
            {" "}
            <Pending></Pending>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/assigment",
        element: <Assigment></Assigment>,
        loader: () => fetch("https://wish-kappa.vercel.app/assigmentCount"),
      },
      {
        path: "/ditels/:_id",
        element: (
          <PrivateRoute>
            <Vew></Vew>
          </PrivateRoute>
        ),
        loader: () => fetch("https://wish-kappa.vercel.app/assigment"),
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><Updade></Updade></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`https://wish-kappa.vercel.app/assigment/${params.id}`),
      },
      {
        path: "/takeassigment/:_id",
        element: (
          <PrivateRoute>
            {" "}
            <TakeAssigment></TakeAssigment>{" "}
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://wish-kappa.vercel.app/assigment/${params._id}`),
      },
      {
        path: "/givemark/:id",
        element: <GiveMark></GiveMark>,
        loader: ({ params }) =>
          fetch(`https://wish-kappa.vercel.app/bids/${params.id}`),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
]);

export default router;
