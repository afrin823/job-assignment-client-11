import React from "react";

const Webb = () => {
  return (
    <div>
      <div className="p-5 mx-auto sm:p-10 md:p-16 bg-base-300">
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <img
            src="https://i.ibb.co/pLCPGcs/images.jpg"
            alt=""
            className="w-full h-60 sm:h-96 dark:bg-gray-500"
          />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-base-300">
            <div className="space-y-2">
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-block text-2xl font-semibold sm:text-3xl"
              >
                Authentication and Authorization: Implement user authentication
                and authorization using techniques like JWT (JSON Web Tokens)
                and sessions. Deployment: Explore deployment options for MERN
                stack applications, such as hosting on platforms like Heroku,
                AWS, or DigitalOcean.
              </a>
              <p className="text-xs ">Full-Stack Development</p>
            </div>
            <div className="">
              <p>Insert the actual text content here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webb;
