import axios from "axios";
import React, { useEffect, useState } from "react";

export const AddVillages = () => {
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [subDistrictData, setSubDistrictData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [pincodeData, setPincodeData] = useState([]);

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingSubdistrict, setLoadingSubDistrict] = useState(false);
  const [loadingBlock, setLoadingBlock] = useState(false);
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVillageData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedState = stateData.find(
      (state) => Number(state.stateId) === Number(villageData.stateId)
    );
    const selectedDistrict = districtData.find(
      (district) =>
        String(district.districtId) === String(villageData.districtId)
    );
    const selectedSubDistrict = subDistrictData.find(
      (subDistrict) =>
        String(subDistrict.subDistrictId) === String(villageData.subDistrictId)
    );
    const selectedBlock = blockData.find(
      (block) => String(block.blockId) === String(villageData.blockId)
    );

    console.log("selectedState", selectedState);
    const payload = {
      village: villageData.village,
      stateId: villageData.stateId,
      districtId: villageData.districtId,
      subDistrictId: villageData.subDistrictId,
      blockId: villageData.blockId,
      pincode: villageData.pincode,
      stateName: selectedState ? selectedState.state : "",
      districtName: selectedDistrict ? selectedDistrict.district : "",
      blockName: selectedBlock ? selectedBlock.block : "",
    };
    console.log("Village Data:", villageData);
    console.log("Village Data:", payload);
  };

  const fetchPincode = async (value) => {
    try {
      setLoadingPincode(true);

      const response = await axios.get(
        `https://masterservice.agrozone.in/master/district/pincode/v1/${value}`
      );
      console.log(response);
      setPincodeData(response.data.data.pinCodes);
    } catch (error) {
    } finally {
      setLoadingPincode(false);
    }
  };

  const fetchDistrict = async (value) => {
    try {
      setLoadingDistricts(true);

      const response = await axios.get(
        `https://masterservice.agrozone.in/master/state/districts/v1/${value}`
      );
      console.log(response);
      setDistrictData(response.data.data.districts);
    } catch (error) {
    } finally {
      setLoadingDistricts(false);
    }
  };
  const fetchSubDistrict = async (value) => {
    try {
      setLoadingSubDistrict(true);

      const response = await axios.get(
        `https://masterservice.agrozone.in/master/district/sub_districts/v1/${value}`
      );
      console.log(response);
      setSubDistrictData(response.data.data.subdistricts);
    } catch (error) {
    } finally {
      setLoadingSubDistrict(false);
    }
  };

  const fetchBlock = async (value) => {
    try {
      setLoadingBlock(true);

      const response = await axios.get(
        `https://masterservice.agrozone.in/master/district/blocks/v1/${value}`
      );
      console.log(response);
      setBlockData(response.data.data.blocks);
    } catch (error) {
    } finally {
      setLoadingBlock(false);
    }
  };

  const fetchState = async () => {
    try {
      setLoadingStates(true);
      const response = await axios.get(
        `https://masterservice.agrozone.in/master/states/v1?searchTerm=&pageNo=&recordsPerPage=`
      );
      setStateData(response.data.data.states);
    } catch (error) {
      setError("Failed to fetch state data. Please try again.");
    } finally {
      setLoadingStates(false);
    }
  };

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setVillageData((prev) => ({ ...prev, [name]: value }));

    if (value != null) {
      fetchDistrict(value);
    }
  };

  const handleDistrictChange = (e) => {
    const { name, value } = e.target;
    setVillageData((prev) => ({ ...prev, [name]: value }));

    if (value) {
      fetchPincode(value);
      fetchSubDistrict(value);
      fetchBlock(value);
    }
  };
  const handelPincode = (e) => {
    const { name, value } = e.target;
    setVillageData((prev) => ({ ...prev, [name]: value }));
  };
  const handelSubDistrict = (e) => {
    const { name, value } = e.target;
    setVillageData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchState();
  }, []);

  return (
    <>
      <div>
        <h1>Manage Village</h1>
      </div>
      <div>
        <div>Add Village</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Village</label>
            <input
              type="text"
              placeholder="Enter Name"
              name="village"
              value={villageData.village}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Select State</label>
            {loadingStates ? (
              <p>Loading states...</p>
            ) : (
              <select
                name="stateId"
                value={villageData.stateId}
                onChange={handleStateChange}
                required
              >
                <option value="">Please select a state</option>
                {stateData.map((state, index) => (
                  <option value={state.stateId} key={state.stateId}>
                    {state.state}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label>Districts</label>
            {loadingDistricts ? (
              <p>Loading Districts...</p>
            ) : (
              <select
                name="districtId"
                value={villageData.districtId}
                onChange={handleDistrictChange}
                required
              >
                <option value="">Please Select A District</option>
                {districtData.map((district) => (
                  <option value={district.districtId} key={district.districtId}>
                    {district.district}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label>Pincode</label>
            {loadingPincode ? (
              <p>Loading Pincode...</p>
            ) : (
              <select
                name="pincode"
                value={villageData.pincode}
                onChange={handelPincode}
                required
              >
                <option value="">Please Select A District</option>
                {pincodeData.map((pincode, index) => (
                  <option value={pincode.pinCode} key={pincode.pinCodeId}>
                    {pincode.pinCode}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label>SubDistrict</label>
            {loadingSubdistrict ? (
              <p>Loading Subdistrict...</p>
            ) : (
              <select
                name="subDistrictId"
                value={villageData.subDistrictId}
                onChange={handelSubDistrict}
                required
              >
                <option value="">Please Select A subDistrict</option>
                {subDistrictData.map((subDistrict) => (
                  <option
                    value={subDistrict.subDistrictId}
                    key={subDistrict.subDistrictId}
                  >
                    {subDistrict.subDistrict}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label>Block</label>
            {loadingBlock ? (
              <p>Loading Block...</p>
            ) : (
              <select
                name="blockId"
                value={villageData.blockId}
                onChange={handelSubDistrict}
                required
              >
                <option value="">Please Select A block</option>
                {blockData.map((block) => (
                  <option value={block.blockId} key={block.blockId}>
                    {block.block}
                  </option>
                ))}
              </select>
            )}
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Submit form</button>
        </form>
      </div>
    </>
  );
};
