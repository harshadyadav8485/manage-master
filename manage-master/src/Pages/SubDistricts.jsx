import { useState } from "react";

export const SubDistricts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    subscription: false,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                placeholder="Enter Name"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                placeholder="Enter Email"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender:
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="form-radio text-indigo-600"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="form-radio text-indigo-600"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="subscription"
                  checked={formData.subscription}
                  onChange={handleChange}
                  className="form-checkbox text-indigo-600"
                />
                <span>Subscription</span>
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="form-checkbox text-indigo-600"
            />
            <span>Accept Terms & Conditions</span>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
