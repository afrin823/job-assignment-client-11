import { useEffect, useState } from "react";

const useServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("https://wish-kappa.vercel.app/assigment")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return services;
};

export default useServices;
