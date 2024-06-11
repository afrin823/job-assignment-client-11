import React from "react";

const Web = () => {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-5 mb-5 ">All Feature</h1>
      <section className="p-4 lg:p-8 bg-base-200 ">
        <div className="container mx-auto space-y-12">
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <img
              src="https://i.ibb.co/3vnW7ys/download-3.jpg"
              alt=""
              className="h-80 dark:bg-gray-500 aspect-video"
            />
            <div className="flex flex-col justify-center flex-1 p-6 bg-base-300">
              <h3 className="text-3xl font-bold">MERN stack developer</h3>
              <p className="my-6 dark:text-gray-600">
                Becoming a MERN (MongoDB, Express.js, React.js, Node.js) stack
                developer involves mastering the technologies within this stack
                to build full-stack web applications. Here's a breakdown of what
                each technology entails and how you can approach learning them
              </p>
              <button type="button" className="self-start">
                Action
              </button>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
            <img
              src="https://i.ibb.co/PT3KWpV/download.jpg"
              alt=""
              className="h-80 dark:bg-gray-500 aspect-video"
            />
            <div className="flex flex-col justify-center flex-1 p-6 bg-base-300">
              <h3 className="text-3xl font-bold">xpress.js</h3>
              <p className="my-6 dark:text-gray-600">
                Learning Path: Basics of Node.js: Familiarize yourself with
                Node.js fundamentals, including event-driven architecture and
                asynchronous programming. Express Routing: Learn how to define
                routes, handle requests, and send responses using Express.
                Middleware: Understand the concept of middleware and how to use
                it for tasks such as authentication, error handling, and
                logging. Integration with MongoDB: Explore how to connect
                Express.js applications to MongoDB using libraries like Mongoose
                for object modeling.
              </p>
              <button type="button" className="self-start">
                Action
              </button>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <img
              src="https://i.ibb.co/nrJLWnp/download-4.jpg"
              alt=""
              className="h-80 dark:bg-gray-500 aspect-video"
            />
            <div className="flex flex-col justify-center flex-1 p-6 bg-base-300">
              <h3 className="text-3xl font-bold">React.js</h3>
              <p className="my-6 dark:text-gray-600">
                Learning Path: Basic Concepts: Understand the core concepts of
                React.js, including components, JSX, state, and props. Component
                Lifecycle: Learn about the lifecycle methods of React components
                and how to manage component state. React Router: Explore React
                Router for client-side routing in single-page applications.
                State Management: Learn about state management solutions like
                Redux or Context API for managing application state in larger
                applications.
              </p>
              <button type="button" className="self-start">
                Action
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Web;
