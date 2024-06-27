import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Firebase/AuthProvider";
import loading from '../../../public/loder.webp';

const Assigment = () => {
  const { user } = useContext(AuthContext);
  const [filterData, setFilterData] = useState("");
  const [data, setData] = useState([]);
  const [currentpage, setCurrentpage] = useState(0);
  const { count = 0 } = useLoaderData();
  const [itemsPage, setItemsPage] = useState(5);
  const numberOfPages = Math.ceil(count / itemsPage);
  const pages = [...Array(numberOfPages).keys()];

  const handelPageChange = (e) => {
    const val = parseInt(e.target.value);
    setItemsPage(val);
    setCurrentpage(0);
  };

  const handelPre = () => {
    if (currentpage > 0) {
      setCurrentpage(currentpage - 1);
    }
  };

  const handelNext = () => {
    if (currentpage < pages.length - 1) {
      setCurrentpage(currentpage + 1);
    }
  };

  const url = `http://localhost:4000/assignment?level=${filterData}&email=${user?.email}&page=${currentpage}&size=${itemsPage}`;
  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [filterData, currentpage, itemsPage]);

  if (!data.length) {
    return <div className="flex justify-center h-screen items-center"><img className="w-24" src={loading} alt="Loading" /></div>;
  }

  const handelDelete = (id, authorEmail) => {
    if (authorEmail !== user?.email) {
      return Swal.fire({
        title: "You have no permission",
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
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/assignment/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((res) => {
            const remaining = data.filter((d) => d._id !== id);
            setData(remaining);
            if (res.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your assignment has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="text-center">
      <select
        onChange={(e) => setFilterData(e.target.value)}
        className="select w-full max-w-xs font-bold text-xl mt-5 mb-5"
        defaultValue=""
      >
        <option value="" disabled hidden>Assignment Level</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {data?.map((item) => (
          <div key={item?._id}>
            <div className="w-full h-full max-w-sm px-4 py-3 bg-base-300 rounded-md shadow-md hover:scale-[1.05] transition-all">
              <div className="mt-3 mb-10 h-[200px]">
                <img className="rounded-md w-full h-full" src={item?.photo} alt="" />
              </div>
              <h1 className="mt-2 text-lg font-semibold">{item?.titleName}</h1>
              <div className="flex items-center justify-between">
                <span className="text-xs font-light">Deadline: {item?.processingTime}</span>
                <span className="text-xs font-light">Total Mark: {item?.mark}</span>
                <span className="px-3 py-2 text-blue-800 uppercase bg-blue-200 rounded-full">{item?.level}</span>
              </div>
              <p className="mt-2 text-sm py-2">{item?.description.slice(0, 90)}</p>
              <div className="flex gap-5 mt-3">
                <Link to={`/details/${item?._id}`}>
                  <button className="btn btn-outline btn-success">View</button>
                </Link>
                <Link to={`/update/${item?._id}`}>
                  <button className="btn btn-outline btn-warning">Update</button>
                </Link>
                <button onClick={() => handelDelete(item?._id, item?.email)} className="btn btn-outline btn-secondary">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 mb-10 text-center pagination font-semibold">
        <p className="mb-2 text-2xl text-gray-500 font-semibold">Current Page: {currentpage}</p>
        <button className="text-gray-600" onClick={handelPre}>Prev</button>
        {pages.map((page) => (
          <button key={page} onClick={() => setCurrentpage(page)} className={currentpage === page ? "selected" : ""}>
            {page}
          </button>
        ))}
        <button className="px-3 text-green-400" onClick={handelNext}>Next</button>
        <select value={itemsPage} onChange={handelPageChange}>
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
