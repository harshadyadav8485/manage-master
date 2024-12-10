import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../Components/UI/Button";
import { Link } from "react-router-dom";

export const District = () => {
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDistrict(searchTerm);
  }, [searchTerm]);

  const fetchDistrict = async (search) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://masterservice.agrozone.in/master/district/v1?searchTerm=${search}&pageNo=1&recordsPerPage=100`
      );
      setDistrictData(response.data.data.districts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    alert("Button clicked!");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="py-4">
        <div className="flex justify-end gap-6 items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by District"
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <Link to="/addDistrict">
            {" "}
            <Button text="Add District" />
          </Link>
        </div>
      </div>{" "}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  District ID
                </th>
                <th scope="col" className="px-6 py-3">
                  District Name
                </th>
                <th scope="col" className="px-6 py-3">
                  State Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Live In Market Place
                </th>
                <th scope="col" className="px-6 py-3">
                  Live For Delivery
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {districtData.map((district) => (
                <tr
                  key={district.districtId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{district.districtId}</td>
                  <td className="px-6 py-4">{district.district}</td>
                  <td className="px-6 py-4">{district.stateName}</td>
                  <td className="px-6 py-4">
                    {district.isLiveForDelivery ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">
                    {district.isLiveOnMarketPlace ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">
                    <Button text="Edit" onClick={handleClick} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
