import { useEffect, useState } from "react";
import Button from "../Components/UI/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const States = () => {
  const navigate = useNavigate();

  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchState = async (search) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://masterservice.agrozone.in/master/states/v1?searchTerm=${search}&pageNo=1&recordsPerPage=100`
      );
      setStateData(response.data.data.states || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (stateId) => {
    console.log(stateId);
    navigate(`/editState/${stateId}`);
  };

  return (
    <>
      <div className="py-4">
        <div className="flex justify-end gap-6 items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by state"
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <Link to="/addState">
            {" "}
            <Button text="Add State" />
          </Link>
        </div>
      </div>

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
                  State ID
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
              {stateData.map((state) => (
                <tr
                  key={state.stateId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{state.stateId}</td>
                  <td className="px-6 py-4">{state.state}</td>
                  <td className="px-6 py-4">
                    {state.isLiveForDelivery ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">
                    {state.isLiveOnMarketPlace ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      text="Edit"
                      onClick={() => handleClick(state.stateId)}
                    />
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
