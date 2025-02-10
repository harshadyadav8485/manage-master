import { useEffect, useState } from "react";
import axios from "axios";

export const AddProjects = () => {
  const [payload, setPayload] = useState({
    projectName: "",
    description: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:9090/project/v1`,
        payload
      );
    } catch (error) {}
  };
  return (
    <div className="bg-white w-full m-4 p-4">
      <form onSubmit={handelSubmit}>
        <div className="flex justify-between gap-5">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ProjectName
            </label>
            <input
              type="text"
              placeholder="Enter Project Name"
              className="border-gray-600 block w-full px-4 py-2 border"
              name="projectName"
              value={payload.projectName}
              onChange={handelChange}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discription
            </label>
            <input
              type="text"
              placeholder="Enter Discription"
              className="border-gray-600 block w-full px-4 py-2 border"
              name="description"
              value={payload.description}
              onChange={handelChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
