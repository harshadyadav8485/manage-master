import { NavLink } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col text-center">
        <h1 className="text-4xl mb-4">404 Error Page</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          <NavLink to="/" className="text-white">
            Back to Home Page
          </NavLink>
        </button>
      </div>
    </>
  );
};
