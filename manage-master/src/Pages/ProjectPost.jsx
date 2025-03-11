import axios from "axios";
import React, { useState } from "react";

export const ProjectPost = () => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:9090/project/v1`,
        projectData
      );
      console.log(response);
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6">
        <div className="border rounded-lg w-full p-6 bg-gray-100 shadow-md">
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              value={projectData.projectName}
              placeholder="Enter Name"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={projectData.description}
              placeholder="Enter description"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
