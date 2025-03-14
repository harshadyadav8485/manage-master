import { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";

export const Practice = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    status: [],
    phoneNumber: "",
    address: {
      city: "",
      state: "",
    },
    roles: [],
  });
  const statuses = ["PENDING", "APPROVED", "IN_PROGRESS"]; // Corrected typo here

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
    { value: "manager", label: "Manager" },
  ];

  const handleChange = (e) => {
    // Corrected typo here
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedObject = (e) => {
    // Corrected typo here
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    // Corrected typo here
    e.preventDefault();
    console.log(userData);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            placeholder="Enter Name"
            onChange={handleChange}
          />
          <br />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            placeholder="Enter Email"
            onChange={handleChange}
          />
          <br />
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            placeholder="Enter Phone Number"
            onChange={handleChange}
          />
          <br />
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
            checked={userData.gender === "male"}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
            checked={userData.gender === "female"}
          />
          Female
          <br />
          <label>Status</label>
          <select
            name="status"
            value={userData.status}
            onChange={handleChange}
            multiple
          >
            <option value="">Select a Status</option>
            {statuses.map(
              (
                status,
                index // Corrected typo here
              ) => (
                <option key={index} value={status}>
                  {status}
                </option>
              )
            )}
          </select>
          <br />
          <label>City</label>
          <input
            type="text"
            name="city"
            value={userData.address.city}
            placeholder="Enter City"
            onChange={handleNestedObject}
          />
          <br />
          <label>State</label>
          <input
            type="text"
            name="state"
            value={userData.address.state}
            placeholder="Enter State"
            onChange={handleNestedObject}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
