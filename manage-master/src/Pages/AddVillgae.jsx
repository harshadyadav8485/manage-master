import { useEffect, useState } from "react";
import axios from "axios";

export const AddVillage = () => {
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [subDistrictData, setSubDistrictData] = useState([]);

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingSubdistrict, setLoadingSubDistrict] = useState(false);

  const [data, setData] = useState({
    stateId: "",
    districtId: "",
    subDistrictId: "",
  });

  const fetchState = async () => {
    setLoadingStates(true);
    try {
      const response = await fetch(
        `https://masterservice.agrozone.in/master/states/v1?searchTerm=&pageNo=&recordsPerPage=`
      );
      const data = await response.json();
      setStateData(data.data.states);
    } catch (error) {
      console.error("Error fetching states:", error);
    } finally {
      setLoadingStates(false);
    }
  };

  const fetchDistrict = async ({ stateId }) => {
    setLoadingDistricts(true);
    try {
      const response = await axios.get(
        `https://masterservice.agrozone.in/master/state/districts/v1/${stateId}`
      );
      setDistrictData(response.data.data.districts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoadingDistricts(false);
    }
  };

  const fetchSubdistrict = async ({ districtId }) => {
    setLoadingSubDistrict(true);
    try {
      const response = await axios.get(
        `https://masterservice.agrozone.in/master/district/sub_districts/v1/${districtId}`
      );

      console.log(response);
      setSubDistrictData(response.data.data.subDistricts);
    } catch (error) {
      console.error("Error fetching subDistricts:", error);
    } finally {
      setLoadingSubDistrict(false);
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log("name ", name);
    console.log("value ", value);

    if (name === "stateId") {
      setDistrictData([]);
      setSubDistrictData([]);
      fetchDistrict({ stateId: value });
    }
    if (name === "districtId") {
      setSubDistrictData([]);
      fetchSubdistrict({ districtId: value });
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", data);
  };

  return (
    <div className="flex flex-col">
      <div>
        <h1>Add Villages</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block">Village</label>
              <input
                type="text"
                placeholder="Enter Village Name"
                className="block w-full p-2"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block">State</label>
              <select
                name="stateId"
                className="block w-full p-2"
                value={data.stateId}
                onChange={handelChange}
                //     disabled={loadingStates}
              >
                <option value="">Select a State</option>
                {stateData.map((state, index) => (
                  <option key={index} value={state.stateId}>
                    {state.state}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block">Districts</label>
              <select
                className="block w-full p-2"
                name="districtId"
                value={data.districtId}
                onChange={handelChange}
                disabled={loadingDistricts || !districtData.length}
              >
                <option value="">
                  {loadingDistricts
                    ? "Loading Districts..."
                    : "Select a District"}
                </option>
                {districtData.map((district, index) => (
                  <option key={index} value={district.districtId}>
                    {district.district}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block">SubDistrict</label>
              <select
                className="block w-full p-2"
                name="subDistrictId"
                value={data.subDistrictId}
                onChange={handelChange}
                // disabled={!subDistrictData.length || loadingSubdistrict}
              >
                <option value="">
                  {loadingSubdistrict
                    ? "Loading SubDistricts..."
                    : "Select a SubDistrict"}
                </option>
                {subDistrictData.map((subDistrict, index) => (
                  <option key={index} value={subDistrict.subDistrictId}>
                    {subDistrict.subDistrict}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};