import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";

export const Villages = () => {
  const [stateData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const FetchVillages = async (search) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://masterservice.agrozone.in/master/village/v1?searchTerm=${search}&page-number=1&size=100`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch villages");
      }
      const data = await response.json();
      setData(data.data.villages || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((search) => {
      FetchVillages(search);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
    debouncedFetch(value);
  };

  const handelClick = () => {
    navigate(`/addVillage`);
  };

  const handelEdit = (villageId) => {
    navigate(`/editVillage/${villageId}`);
  };

  useEffect(() => {
    FetchVillages("");
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="overflow-hidden">
        <div className=" m-auto p-4 flex justify-between sticky top-0 z-10">
          <div className="text-gray-700 text-lg font-bold">
            <h1>Villages</h1>
          </div>
          <div>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <button
              className="border rounded px-3 py-1 hover:text-white hover:bg-black"
              onClick={handelClick}
            >
              Add Village
            </button>
          </div>
        </div>
        <div className=" overflow-auto max-h-[600px]">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">Village</th>
                <th className="px-6 py-3">State</th>
                <th className="px-6 py-3">District</th>
                <th className="px-6 py-3">Sub District</th>
                <th className="px-6 py-3">Block</th>
                <th className="px-6 py-3">Live In Marketplace</th>
                <th className="px-6 py-3">Live For Delivery</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {stateData.length > 0 ? (
                stateData.map((village) => (
                  <tr className="bg-white border-b" key={village.villageId}>
                    <td className="px-6 py-4">{village.village}</td>
                    <td className="px-6 py-4">{village.stateName}</td>
                    <td className="px-6 py-4">{village.districtName}</td>
                    <td className="px-6 py-4">{village.subDistrictName}</td>
                    <td className="px-6 py-4">{village.blockName}</td>
                    <td className="px-6 py-4">
                      {village.isLiveOnMarketPlace ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">
                      {village.isLiveForDelivery ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="hover:bg-green-400 px-2"
                        onClick={() => handelEdit(village.villageId)}
                      >
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
                      </button>
                      <button className="hover:bg-red-500 px-2">
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 15v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3M3 15V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9M3 15h18M8 15v4m4-4v4m4-4v4m-5.5061-7.4939L12 10m0 0 1.5061-1.50614M12 10l1.5061 1.5061M12 10l-1.5061-1.50614"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4" colSpan="8">
                    No villages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
