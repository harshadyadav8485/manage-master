import React, { useEffect, useState, useReducer } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

export const ViewTabel = () => {
  const [districtData, setDistrictData] = useState([]);

  const [rolePayload, setRolePayload] = useState({
    roleName: "",
    description: "",
    status: "ACTIVE",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialState = {
    name: "harshal",
    age: "26",
    city: "phaltan",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_NAME":
        return { ...state, name: action.payload };
      case "UPDATE_AGE":
        return { ...state, age: action.payload };
      case "UPDATE_CITY":
        return { ...state, city: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchDistrict = async () => {
    const response = await fetch(
      `https://masterservice.agrozone.in/master/state/districts/v1/2`
    );

    const data = await response.json();
    setDistrictData(data.data.districts);
    console.log(data.data.districts);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setRolePayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9090/role/v1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rolePayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onConfirm = () => {
    setIsModalOpen(false);
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchDistrict();
  }, []);

  return (
    <>
      <div className="overflow-y-auto max-h-[600px] border border-gray-300 p-2">
        <div className="max-h-90 overflow-y-auto border border-gray-300 p-2">
          <div className="grid grid-cols-4 gap-2 bg-gray-200 font-bold">
            <div className="p-2 border">ID</div>
            <div className="p-2 border">Name</div>
            <div className="p-2 border">Age</div>
            <div className="p-2 border">Country</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="p-2 border">1</div>
            <div className="p-2 border">John Doe</div>
            <div className="p-2 border">25</div>
            <div className="p-2 border">USA</div>

            <div className="p-2 border">2</div>
            <div className="p-2 border">Jane Smith</div>
            <div className="p-2 border">30</div>
            <div className="p-2 border">UK</div>
          </div>
        </div>
        //Implement Get API by using Async
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-5">
          {districtData.map((district) => (
            <div
              key={district.districtId}
              className="p-4 bg-white shadow-lg rounded-lg text-black transition-all duration-300 
                 hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-md font-serif">{district.district}</h3>
            </div>
          ))}
        </div>
        //Implement post api by using Async and await
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 mt-4 gap-2">
            <div>
              <lable className="ml-2">Role Name</lable>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring-2 focus:ring-blue-400 
                transition-all duration-200 ease-in-out outline-none"
                placeholder="Enter Role Name"
                name="roleName"
                value={rolePayload.roleName}
                onChange={handelChange}
              />
            </div>
            <div>
              <lable className="ml-2">Description</lable>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring-2 focus:ring-blue-400 
                transition-all duration-200 ease-in-out outline-none"
                name="description"
                value={rolePayload.description}
                onChange={handelChange}
              />
            </div>{" "}
            <div>
              <label className="ml-2"> State</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                transition-all duration-200 ease-in-out outline-none"
                name="status"
                value={rolePayload.status}
                onChange={handelChange}
              >
                <option>Select a Status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-white hover:text-black border border-blue-500 shadow-lg">
              Submit
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white hover:text-black border shadow-lg">
              Cancel
            </button>
          </div>
        </form>
        //Implement useReducer hook
        <div>
          <h2>{state.name}</h2>
          <h2>{state.age}</h2>
          <h2>{state.city}</h2>

          <button
            onClick={() => dispatch({ type: "UPDATE_NAME", payload: "Sai" })}
            className="p-2 bg-white text-black border rounded-md shadow"
          >
            Change Name
          </button>
          <button
            onClick={() => dispatch({ type: "UPDATE_AGE", payload: 31 })}
            className="p-2 bg-white text-black border rounded-md shadow"
          >
            Change Age
          </button>

          <button
            onClick={() => dispatch({ type: "UPDATE_CITY", payload: "Nanded" })}
            className="p-2 bg-white text-black border rounded-md shadow"
          >
            Update City
          </button>
        </div>
        <div className="p-5 m-4">
          //Implement confirmation modal in tailwind
          <br />
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Show Confirmation Modal
          </button>
          {isModalOpen && (
            <ConfirmationModal
              title="Confirmation Action"
              message="Are you sure you want to proceed"
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          )}
        </div>
      </div>
    </>
  );
};
