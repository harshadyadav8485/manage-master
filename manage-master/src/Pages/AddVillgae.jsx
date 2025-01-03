import { useEffect, useState } from "react";
import axios from "axios";
import SelectInput from "../Components/UI/SelectInput";

export const AddVillage = () => {
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

  const [data, setData] = useState({
    stateId: "",
    districtId: "",
    subDistrictId: "",
    blockId: "",
    pincode: "",
  });

  const fetchData = async (url, setter, setLoading) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setter(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchState = () => {
    fetchData(
      `https://masterservice.agrozone.in/master/states/v1?searchTerm=&pageNo=&recordsPerPage=`,
      (data) => setStateData(data.states),
      setLoadingStates
    );
  };

  const fetchDistrict = (stateId) => {
    fetchData(
      `https://masterservice.agrozone.in/master/state/districts/v1/${stateId}`,
      (data) => setDistrictData(data.districts),
      setLoadingDistricts
    );
  };

  const fetchSubdistrict = (districtId) => {
    fetchData(
      `https://masterservice.agrozone.in/master/district/sub_districts/v1/${districtId}`,
      (data) => setSubDistrictData(data.subdistricts),
      setLoadingSubDistrict
    );
  };

  const fetchBlock = (districtId) => {
    fetchData(
      `https://masterservice.agrozone.in/master/district/blocks/v1/${districtId}`,
      (data) => setBlockData(data.blocks),
      setLoadingBlock
    );
  };

  const fetchPincode = (districtId) => {
    fetchData(
      `https://masterservice.agrozone.in/master/district/pincode/v1/${districtId}`,
      (data) => setPincodeData(data.pinCodes),
      setLoadingPincode
    );
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      stateId: value,
      districtId: "",
      subDistrictId: "",
      blockId: "",
    }));
    fetchDistrict(value);
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      districtId: value,
      subDistrictId: "",
      blockId: "",
    }));
    fetchSubdistrict(value);
    fetchBlock(value);
    fetchPincode(value);
  };

  const handleSubDistrictChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      subDistrictId: value,
    }));
  };

  const handleBlockChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      blockId: value,
    }));
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      pincode: value,
    }));
  };

  useEffect(() => {
    fetchState();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedState = stateData.find(
      (state) => state.stateId === data.stateId
    );
    const selectedDistrict = districtData.find(
      (district) => district.districtId === data.districtId
    );
    const selectedBlock = blockData.find(
      (block) => block.blockId === data.blockId
    );

    const payload = {
      stateId: data.stateId,
      districtId: data.districtId,
      subDistrictId: data.subDistrictId,
      blockId: data.blockId,
      pincode: data.pincode,
      stateName: selectedState ? selectedState.state : "",
      districtName: selectedDistrict ? selectedDistrict.district : "",
      blockName: selectedBlock ? selectedBlock.block : "",
    };

    console.log("Form data submitted:", payload);
  };

  return (
    <div className="flex flex-col">
      <h1>Add Village</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1">Village</label>
            <input
              type="text"
              placeholder="Enter Village Name"
              className="block w-full p-2"
            />
          </div>
          <SelectInput
            label="State"
            name="stateId"
            value={data.stateId}
            onChange={handleStateChange}
            options={stateData.map((state) => ({
              id: state.stateId,
              name: state.state,
            }))}
            loading={loadingStates}
          />
          <SelectInput
            label="District"
            name="districtId"
            value={data.districtId}
            onChange={handleDistrictChange}
            options={districtData.map((district) => ({
              id: district.districtId,
              name: district.district,
            }))}
            loading={loadingDistricts}
            disabled={loadingDistricts || !districtData.length}
          />
        </div>
        <div className="flex justify-between flex-wrap gap-4">
          <SelectInput
            label="SubDistrict"
            name="subDistrictId"
            value={data.subDistrictId}
            onChange={handleSubDistrictChange}
            options={subDistrictData.map((subDistrict) => ({
              id: subDistrict.subDistrictId,
              name: subDistrict.subDistrict,
            }))}
            loading={loadingSubdistrict}
            disabled={loadingSubdistrict || !subDistrictData.length}
          />
          <SelectInput
            label="Block"
            name="blockId"
            value={data.blockId}
            onChange={handleBlockChange}
            options={blockData.map((block) => ({
              id: block.blockId,
              name: block.block,
            }))}
            loading={loadingBlock}
            disabled={loadingBlock || !blockData.length}
          />
          <SelectInput
            label="Pincode"
            name="pincode"
            value={data.pincode}
            onChange={handlePincodeChange}
            options={pincodeData.map((pincode) => ({
              id: pincode.pincode,
              name: pincode.pinCode,
            }))}
            loading={loadingPincode}
            disabled={loadingPincode || !pincodeData.length}
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
