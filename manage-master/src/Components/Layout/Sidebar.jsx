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
      </ul>
    </div>
  );
};
