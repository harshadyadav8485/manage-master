import axios from "axios";
import React, { useEffect, useState } from "react";

export const VillagePost = () => {
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [pinCodeData, setPinCodeData] = useState([]);
  const [subDistrictData, setSubDistrictData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [villageData, setVillageData] = useState({
    village: "",
    stateId: null,
    districtId: null,
    subDistrictId: null,
    blockId: null,
    pincode: null,
    isLiveInMarket: "Yes",
    liveForDelivery: "Yes",
  });

  const fetchStateData = async () => {
    try {
      const response = await axios.get(
        `https://masterservice.agrozone.in/master/states/v1?searchTerm=&pageNo=&recordsPerPage=`
      );
      setStateData(response.data.data.states);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDistrictData = async () => {
    try {
      const res = await axios.get(
        `https://masterservice.agrozone.in/master/state/districts/v1/2`
      );
      setDistrictData(res.data.data.districts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubDistrictData = async () => {
    try {
      const resp = await axios.get(
        `https://masterservice.agrozone.in/master/district/sub_districts/v1/3`
      );
      setSubDistrictData(resp.data.data.subdistricts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPinCodeData = async () => {
    try {
      const resp = await axios.get(
        `https://masterservice.agrozone.in/master/district/pincode/v1/3`
      );
      setPinCodeData(resp.data.data.pinCodes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlockData = async () => {
    try {
      const resp = await axios.get(
        `https://masterservice.agrozone.in/master/district/blocks/v1/3`
      );
      setBlockData(resp.data.data.blocks);
    } catch (error) {
      console.log(error);
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setVillageData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(villageData);
  };

  useEffect(() => {
    fetchStateData();
    fetchDistrictData();
    fetchSubDistrictData();
    fetchPinCodeData();
    fetchBlockData();
  }, []);

  return (
    <>
      <form onSubmit={handelSubmit}>
        <div className="bg-white p-4 rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.1)] flex-wrap">
          <div className="flex justify-between w-full gap-4 flex-wrap">
            <div className="flex flex-col flex-1">
              <label className="ml-2">Village</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring-2 focus:ring-blue-400 
                transition-all duration-200 ease-in-out outline-none"
                name="village"
                value={villageData.village}
                onChange={handelChange}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="ml-2">State</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                transition-all duration-200 ease-in-out outline-none"
                name="stateId"
                value={villageData.stateId}
                onChange={handelChange}
              >
                <option>Select a state</option>
                {stateData.map((state, index) => (
                  <option key={index} value={state.stateId}>
                    {state.state}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="ml-2">District</label>
              <select
                className="w-full px-2 py-2 border rounded-lg shadow-md"
                name="districtId"
                value={villageData.districtId}
                onChange={handelChange}
              >
                <option>Select District</option>
                {districtData.map((district) => (
                  <option key={district.districtId} value={district.districtId}>
                    {district.district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between w-full gap-4 mt-4 flex-wrap">
            <div className="flex flex-col flex-1">
              <label className="ml-2">Pin Code</label>
              <select
                className="w-full px-2 py-2 border rounded-lg shadow-md"
                name="pincode"
                value={villageData.pincode}
                onChange={handelChange}
              >
                <option>Select Pin Code</option>
                {pinCodeData.map((pincode) => (
                  <option key={pincode.pinCodeId}>{pincode.pinCode}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="ml-2">Sub District</label>
              <select
                className="w-full px-2 py-2 border rounded-lg shadow-md"
                name="subDistrictId"
                value={villageData.subDistrictId}
                onChange={handelChange}
              >
                <option>Select Sub District</option>
                {subDistrictData.map((subdistrict) => (
                  <option
                    key={subdistrict.subDistrictId}
                    value={subdistrict.subDistrictId}
                  >
                    {subdistrict.subDistrict}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="ml-2">Block</label>
              <select
                className="w-full px-2 py-2 border rounded-lg shadow-md"
                name="blockId"
                value={villageData.blockId}
                onChange={handelChange}
              >
                <option>Select Block</option>
                {blockData.map((block) => (
                  <option key={block.blockId} value={block.blockId}>
                    {block.block}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 flex-wrap">
            <div className="flex flex-col flex-1">
              <label className="ml-2">Live in Market</label>
              <select className="w-full px-2 py-2 border rounded-lg shadow-md">
                <option>Select Live in Market</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="ml-2">Live for Delivery</label>
              <select className="w-full px-2 py-2 border rounded-lg shadow-md">
                <option>Select Live for Delivery</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
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
        </div>
      </form>

      <form>
        <div className="bg-white p-4 rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.1)] flex-wrap">
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label className="ml-2"> Village</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring-2 focus:ring-blue-400 
                transition-all duration-200 ease-in-out outline-none"
              />
            </div>
            <div>
              <label className="ml-2"> State</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                transition-all duration-200 ease-in-out outline-none"
              >
                <option>Select a state</option>
                {stateData.map((state, index) => (
                  <option key={index}>{state.state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="ml-2"> District</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
               transition-all duration-200 ease-in-out outline-none"
              >
                <option>Select District</option>
                {districtData.map((district) => (
                  <option key={district.districtId}>{district.district}</option>
                ))}
              </select>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </form>

      {/* <div className="grid grid-cols-3 ">
        <div>g1</div>
        <div>g1</div>
        <div>g1</div>
      </div> */}
    </>
  );
};
