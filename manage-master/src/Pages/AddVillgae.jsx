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

  const liveMarketOptions = [
    { id: "true", name: "Yes" },
    { id: "false", name: "No" },
  ];
  const [data, setData] = useState({
    village: "",
    stateId: "",
    districtId: "",
    subDistrictId: "",
    blockId: "",
    pincode: "",
    isLiveInMarket: "Yes",
    liveForDelivery: "Yes",
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

  const handelchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value === "true" ? true : value === "false" ? false : value,
    }));
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

    if (
      !data.village ||
      !data.stateId ||
      !data.districtId ||
      !data.subDistrictId ||
      !data.blockId ||
      !data.pincode
    ) {
      alert("All fields are mandatory. Please fill in all the details.");
      return;
    }

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
      village: data.village,
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

    setData({
      stateId: "",
      districtId: "",
      subDistrictId: "",
      blockId: "",
      pincode: "",
      village: "",
      isLiveInMarket: false,
      isLiveForDelivery: false,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 bg-white m-2 rounded-lg shadow-lg  w-full box-border">
        <h1 className="text-xl font-semibold mb-4">Add Village</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block">Village</label>
              <input
                type="text"
                placeholder="Enter Village Name"
                className="block w-full p-2 border border-gray-300 rounded"
                name="village"
                value={data.village}
                onChange={handelchange}
                required
              />
            </div>
            <div className="flex-1 min-w-[150px]">
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
                required
              />
            </div>
            <div className="flex-1 min-w-[150px]">
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
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1 min-w-[150px]">
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
                required
              />
            </div>
            <div className="flex-1 min-w-[150px]">
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
                required
              />
            </div>
            <div className="flex-1 min-w-[150px]">
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
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1 min-w-[150px]">
              <SelectInput
                label="Is Live In Market"
                name="isLiveInMarket"
                value={data.isLiveInMarket}
                onChange={handelchange}
                options={liveMarketOptions}
                required
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <SelectInput
                label="Live For Delivery"
                name="liveForDelivery"
                value={data.liveForDelivery}
                onChange={handelchange}
                options={liveMarketOptions}
                required
              />
            </div>{" "}
            ;
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded w-full sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
