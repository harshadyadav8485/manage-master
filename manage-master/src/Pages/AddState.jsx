import React, { useState } from "react";
import Button from "../Components/UI/Button";
import axios from "axios";

export const AddState = () => {
  const [stateData, setStateData] = useState({
    stateName: "",
    stateCode: "",
    isLiveInMarket: "Yes",
    liveForDelivery: "Yes",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setStateData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://api.example.com/addState`,
        stateData
      );
    } catch (error) {}
  };
  return (
    <>
      <div>
        <form className="space-y-6 bg-white p-4 m-4 " onSubmit={handelSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={stateData.stateName}
                name="stateName"
                onChange={handelChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State code
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Is Live In Market{" "}
              </label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Live for delivery
              </label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              {/* <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              /> */}
            </div>
          </div>
          <Button text="Submit" />
        </form>
      </div>
    </>
  );
};
