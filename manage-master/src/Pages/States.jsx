import { useEffect, useState } from "react";
import Button from "../Components/UI/Button";
import axios from "axios";

export const States = () => {
  const [stateData, setStateData] = useState([]);
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchState = async (searchTerm) => {
    setLoding(true);
    try {
      const response = await axios.get(
        `https://masterservice.agrozone.in/master/states/v1?searchTerm=${searchTerm}&pageNo=1&recordsPerPage=100`
      );
      setStateData(response.data.data.states);
      setLoding(false);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchState(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    alert("Button clicked!");
  };

  useEffect(() => {
    fetchState();
  }, []);

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
          <Button text="Add State" />
        </div>
      </div>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                State ID
              </th>
              <th scope="col" class="px-6 py-3">
                State Name
              </th>
              <th scope="col" class="px-6 py-3">
                Live In Market place
              </th>
              <th scope="col" class="px-6 py-3">
                Live For Delivery
              </th>
              <th scope="col" class="px-6 py-3">
                Action{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {stateData.map((state) => (
              <tr
                key={state.stateId}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="px-6 py-4">{state.stateId}</td>
                <td class="px-6 py-4">{state.state}</td>
                <td class="px-6 py-4">
                  {state.isLiveForDelivery ? "true" : false}
                </td>
                <td class="px-6 py-4">
                  {state.isLiveOnMarketPlace ? "true" : false}
                </td>{" "}
                <td class="px-6 py-4">
                  <Button text="Edit" onClick={handleClick} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
