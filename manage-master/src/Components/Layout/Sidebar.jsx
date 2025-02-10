import { Link } from "react-router-dom"; // Make sure you import Link

export const Sidebar = () => {
  return (
    <div className="w-56 bg-gray-800 text-white fixed inset-y-0 left-0">
      <div className="p-4 font-bold text-lg text-center">Sidebar</div>
      <ul className="mt-4 text-center">
        <Link to="/states">
          {" "}
          <li className="p-4 hover:bg-gray-700 cursor-pointer">States</li>
        </Link>
        <Link to="/districts">
          {" "}
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Districts</li>
        </Link>
        <Link to="/subDistricts">
          {" "}
          <li className="p-4 hover:bg-gray-700 cursor-pointer">SubDistricts</li>
        </Link>{" "}
        <Link to="/villages">
          {" "}
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Villages</li>
        </Link>
        <Link to="/projects">
          {" "}
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Projects</li>
        </Link>
        <Link to="/epic">
          {" "}
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Epic</li>
        </Link>
        <Link to="/createTask">
          {" "}
          <li className="p-4 hover:bg-gray-700 cursor-pointer">CreateTask</li>
        </Link>
        <Link to={"/subtask"}>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Subtask</li>
        </Link>
        <Link to={"/role"}>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Role</li>
        </Link>
      </ul>
    </div>
  );
};
