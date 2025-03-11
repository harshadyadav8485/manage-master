import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Practice2 = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
    phoneNumber: "",
    address: {
      city: "",
      state: "",
    },
    roles: [],
  });
  const statuses = ["PENDING", "APPROVED", "IN_PROGRESS"];

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
    { value: "manager", label: "Manager" },
  ];
  const statues = ["PENDING", "APPROVED", "IN_PROGRESS"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("name", name);
    // console.log("value", value);

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
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
    e.preventDefault();
    console.log("userData", userData);
    setUserData({
      name: "",
      email: "",
      gender: "",
      status: "",
      phoneNumber: "",
      address: {
        city: "",
        state: "",
      },
    });

    // navigate("/");
  };

  return (
    <>
      <div>
        <h1>practice</h1>

        <form onSubmit={handleSubmit}>
          <lable>Name</lable>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={userData.name}
            onChange={handleChange}
          />
          <br />
          <lable>Email</lable>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={userData.email}
            onChange={handleChange}
          />
          <br />
          <lable>PhoneNumber</lable>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter phoneNumber"
            value={userData.phoneNumber}
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
          <select name="status" value={userData.status} onChange={handleChange}>
            <option value="">Select a status</option>
            {statues.map((staus, index) => (
              <option key={index} value={staus}>
                {staus}
              </option>
            ))}
          </select>
          <br />
          <lable>City</lable>
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={userData.address.city}
            onChange={handleAddressChange}
          />
          <br />
          <lable>State</lable>
          <input
            type="text"
            name="state"
            placeholder="Enter state"
            value={userData.address.state}
            onChange={handleAddressChange}
          />
          <br />
          <button type="submit" className="bg-white text-black">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
