import { useEffect, useState } from "react";

const useServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("https://job-assignmnet-server.vercel.app/assigment")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return services;
};

export default useServices;
