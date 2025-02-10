import axios from "axios";
import { useState } from "react";

export const AddEpic = () => {
  const [epicData, setEpic] = useState({
    name: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setEpic((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state before sending request
    setSuccessMessage(null); // Reset success message

    try {
      const response = await axios.post(
        `http://localhost:9090/epic/v1`,
        epicData
      );

      if (response.status === 200) {
        console.log(response);
        setSuccessMessage("Epic added successfully!");
      }
    } catch (err) {
      console.error("Error occurred:", err);
      setError("Failed to add epic. Please try again.");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <form onSubmit={handelSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Epic Name
            </label>
            <input
              type="text"
              name="name"
              value={epicData.name}
              placeholder="Enter Epic Name"
              onChange={handelChange}
              className="w-full px-4 py-2 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-sm font-semibold">{error}</div>
        )}
        {successMessage && (
          <div className="mt-4 text-green-600 text-sm font-semibold">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};
