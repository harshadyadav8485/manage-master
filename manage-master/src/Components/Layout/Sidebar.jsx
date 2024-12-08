export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white fixed inset-y-0 left-0">
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        Sidebar
      </div>
      <ul className="mt-4">
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Profile</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Logout</li>
      </ul>
    </div>
  );
};
