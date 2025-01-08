import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EditState = () => {
  const { stateId } = useParams();

  const [state, stateData] = useState({
    state: "",
    stateCode: "",
    isLiveOnMarketPlace: true,
    isLiveForDelivery: true,
    stateId: "",
  });

  const handelOnChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    const { name, value } = e.target;
    stateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchStateData = async () => {
    try {
      const response = await axios.get(
        `https://masterservice.agrozone.in/master/state/v1/${stateId}`
      );
      const data = response.data.data;
      stateData({
        state: data.state,
        stateCode: data.stateCode,
        isLiveOnMarketPlace: data.isLiveOnMarketPlace,
        isLiveForDelivery: data.isLiveForDelivery,
      });
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  useEffect(() => {
    if (stateId) {
      fetchStateData();
    }
  }, [stateId]);

  return (
    <>
      <div className="flex flex-col mx-auto p-6 bg-gray-50 shadow-md rounded-lg ">
        <div className="text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
          Manage Master
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-700 mb-4 text-center sm:text-left">
            Update State
          </h1>
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <form onSubmit={handelSubmit}>
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex-1 min-w-[240px]">
                  <label className="block mb-2 text-sm text-gray-600">
                    State Name
                  </label>
                  <input
                    type="text"
                    className="w-full block px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={state.state}
                    name="state"
                    onChange={handelOnChange}
                  />
                </div>
                <div className="flex-1 min-w-[240px]">
                  <label className="block mb-2 text-sm text-gray-600">
                    State Code
                  </label>
                  <input
                    type="text"
                    className="w-full block px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={state.stateCode}
                    name="stateCode"
                    onChange={handelOnChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-between gap-4 mt-4">
                <div className="flex-1 min-w-[240px]">
                  <label className="block mb-2 text-sm text-gray-600">
                    Live In Market
                  </label>
                  <select
                    className="w-full block px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={state.isLiveOnMarketPlace}
                    name="isLiveOnMarketPlace"
                    onChange={handelOnChange}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[240px]">
                  <label className="block mb-2 text-sm text-gray-600">
                    Live For Delivery
                  </label>
                  <select
                    className="w-full block px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={state.isLiveForDelivery}
                    name="isLiveForDelivery"
                    onChange={handelOnChange}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
