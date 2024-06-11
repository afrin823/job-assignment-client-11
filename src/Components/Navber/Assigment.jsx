import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Firebase/AuthProvider";
import loading from '../../../public/Loading_2.gif'

const Assigment = () => {
  const { user } = useContext(AuthContext);
  const [filterData, setFilterData] = useState("");
  const [data, setdata] = useState([]);
  
  //console.log(data);
  //-------------------------pagenition start
  const [currentpage, setCsourrentpage] = useState(0);
  const { count } = useLoaderData();
  const [itemsPage, setItemPage] = useState(5);
  //console.log(count);
  const numberOfPages = Math.ceil(count / itemsPage);

  const pages = [...Array(numberOfPages).keys()];

  const handelPageChange = (e) => {
    // console.log(e.target.value);
    const val = parseInt(e.target.value);
    //console.log(val);
    setItemPage(val);
    setCsourrentpage(0);
  };

  const handelPre = () => {
    if (currentpage > 0) {
      setCsourrentpage(currentpage - 1);
    }
  };

  const handelNext = () => {
    if (currentpage < pages.length - 1) {
      setCsourrentpage(currentpage + 1);
    }
  };

  //---------------------pagination end

  // const url=`http://localhost:5000/assigment?product?page=${currentpage}&size=${itemsPage}`;
  //console.log(filterData);
  const url = `https://wish-kappa.vercel.app/assigment?level=${filterData}&email=${user?.email}`;
  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setdata(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [filterData]);
  if (!data.length) {
    return <div className="flex justify-center h-screen items-center"><img src={loading} alt="" /></div>
  }

  //console.log(data);
  //----------------------------------

  const handeldelete = (id, authorEmail) => {
    // console.log("delete", id);
    if (authorEmail !== user?.email) {
      return Swal.fire({
        title: "your have no permition",
        // text: "You won't be able to revert this!",
        // icon: "warning",
        // showCancelButton: true,
        // confirmButtonColor: "#3085d6",
        // cancelButtonColor: "#d33",
        // confirmButtonText: "Yes, delete it!",
      });
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      //    console.log(result);

      if (result.isConfirmed) {
        fetch(`https://wish-kappa.vercel.app/assigment/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            const remaining = data.filter((d) => d._id !== id);
            setdata(remaining);
            //  console.log(remaining,data);
            if (res.deletedCount > 0) {
              // window.location.reload()
              Swal.fire({
                title: "Deleted!",
                text: "Your craft has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  //console.log(filterData);
  //-------------

  return (
    <div className="">
      <select
        onChange={(e) => setFilterData(e.target.value)}
        className="select w-full max-w-xs font-bold text-xl mt-5 mb-5"
      >
        <option disabled hidden selected className="">
          Assigment Level
        </option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <div className=" mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {data?.map((item) => {
          return (
            <div key={item?._id}>
              <div className="w-full max-w-sm px-4 py-3 bg-base-300 rounded-md shadow-md hover:scale-[1.05] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light  ">
                    Deadline: {item?.processingTime}
                  </span>
                  <span className="text-xs font-light  ">
                    Total Mark: {item?.mark}
                  </span>

                  <span className="px-3 py-1 text-blue-800 uppercase bg-blue-200 rounded-full ">
                    {item?.level}
                  </span>
                </div>

                <div>
                  <h1 className="mt-2 text-lg font-semibold  ">
                    {item?.titleName}
                  </h1>

                  <div className=" mt-3 mb-10 h-[200px]">
                    <img className="rounded-md" src={item?.photo} alt="" />
                  </div>

                  <p className="mt-2 text-sm  ">
                    {item?.description.slice(0, 90)}
                  </p>
                  <div className="flex gap-5 mt-3">
                    <Link to={`/ditels/${item?._id}`}>
                      <button className="btn bg-blue-400">View</button>
                    </Link>

                    <Link to={`/update/${item?._id}`}>
                      <button className="btn bg-green-400">Updata</button>
                    </Link>

                    <button
                      onClick={() => handeldelete(item?._id, item?.email)}
                      className="btn bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 mb-10 text-center pagenation font-semibold">
        <p className=" mb-2 font-semibold">Current Page:{currentpage}</p>
        <button onClick={handelPre}>Prev</button>

        {pages.map((pages) => (
          <button
            onClick={() => setCsourrentpage(pages)}
            className={currentpage === pages && "selected"}
          >
            {pages}
          </button>
        ))}
        <button onClick={handelNext}>Next</button>
        <select value={itemsPage} onChange={handelPageChange} name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default Assigment;
