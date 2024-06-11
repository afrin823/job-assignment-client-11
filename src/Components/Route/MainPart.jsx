import { Outlet } from "react-router-dom";
import Navber from "../Navber/Navber";
import Footer from "../Footer";

const MainPart = () => {
  return (
    <div className="font-roboto ">
      <div className="min-h-[100vh] mx-auto max-w-7xl">
        <Navber></Navber>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainPart;
