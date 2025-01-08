import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubDistricts } from "./SubDistricts";

export const EditVillage = () => {
  const { villageId } = useParams();

  const [villageData, setVillageData] = useState([]);
  const [loadingVillage, setLoadingVillage] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    // villageId: "",
    // stateId: "",
    // districtId: "",
    // subDistrictId: "",
    // blockId: "",
    village: "",
    state: "",
    district: "",
    subDistrict: "",
    block: "",
    pincode: "",
    isLiveForDelivery: true,
    isLiveOnMarketPlace: true,
  });

  const fetchVillage = async () => {
    try {
      setLoadingVillage(true);
      const response = await axios.get(
        `https://masterservice.agrozone.in/master/village/v1/${villageId}`
      );
      console.log(response);

      setFormData({
        village: response.data.data.village,
        state: response.data.data.stateName,
        district: response.data.data.districtName,
        subDistrict: response.data.subDistrictName,
        block: response.data.data.blockName,
        pincode: response.data.data.pincode,
      });
      console.log(formData);
    } catch (error) {
      setError("Failed to fetch village data.");
      console.error(error);
    } finally {
      setLoadingVillage(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "Checkbox" ? checked : value,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", JSON.stringify(formData, null, 2));
  };

  useEffect(() => {
    fetchVillage();
  }, [villageId]);

  return (
    <>
      <div className="bg-white p-4 m-4">
        <div className="bg-orange-500 text-lg font-bold text-white p-2">
          {" "}
          <h1>Edit Village</h1>
        </div>
        <form onSubmit={handelSubmit}>
          <div className="flex flex-wrap py-2">
            <div className="flex-1">
              <label className="block py-2">Village</label>
              <input
                type="text"
                name="villageId"
                value={formData.village}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label className="block py-2">Village</label>
              <input
                type="text"
                name="villageId"
                value={formData.village}
                className="block w-full p-2 border border-gray-300 rounded"
              />
            </div>{" "}
            <div className="flex-1">
              <label className="block py-2">Village</label>
              <input
                type="text"
                name="villageId"
                value={formData.village}
                className="block w-full p-2 border border-gray-300 rounded"
              />
            </div>{" "}
          </div>
        </form>
      </div>
    </>
  );
};
