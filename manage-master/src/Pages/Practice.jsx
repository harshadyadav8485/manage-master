import { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";

export const Practice = () => {
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

  const handelChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelNestedObject = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <>
      <div>
        <form onSubmit={handelSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            placeholder="enter Name"
            onChange={handelChange}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            placeholder="enter email"
            onChange={handelChange}
          />{" "}
          <label>PhoneNumber</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            placeholder="enter phoneNumber"
            onChange={handelChange}
          />
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handelChange}
            checked={userData.gender === "male"}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handelChange}
            checked={userData.gender === "female"}
          />
          Female
          <label>Status</label>
          <select name="status" value={userData.status} onChange={handelChange}>
            <option value="">Select a Status</option>
            {statues.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={userData.address.city}
            placeholder="enter City"
            onChange={handelNestedObject}
          />
          <label>State</label>
          <input
            type="text"
            name="state"
            value={userData.address.state}
            placeholder="enter City"
            onChange={handelNestedObject}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
//   const [user, setUser] = useState({ name: "Alice", age: 5 });
//   const [open, setOpen] = useState(false); // State for Snackbar

//   const updateUser = () => {
//     setUser((prev) => ({ ...prev, age: prev.age + 1 }));
//   };

//   const decrement = () => {
//     if (user.age <= 1) {
//       setOpen(true); // Show Snackbar
//       return;
//     }
//     setUser((prev) => ({ ...prev, age: prev.age - 1 }));
//   };

//   const [empData, setEmpData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//   });

//   const empDataChange = (e) => {
//     const { name, value } = e.target;
//     setEmpData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handelSubmit = (e) => {
//     e.preventDefault();

//     console.log("EmpData", empData);
//     console.log("formData", formData);
//   };

//   const hobbiesList = ["Reading", "Gaming", "Traveling", "Cooking"];

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     hobbies: [],
//     gender: "",
//   });

//   const hanelFormData = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handelCheckBox = (e) => {
//     console.log(e);
//     const { value, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       hobbies: checked
//         ? [...prev.hobbies, value]
//         : prev.hobbies.filter((h) => h !== value),
//     }));
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center ">
//         <form
//           className="bg-white shadow-lg p-6 rounded-lg w-full"
//           onSubmit={handelSubmit}
//         >
//           <div>
//             <label>Name</label>
//             <input
//               type="text"
//               placeholder="enterName"
//               required
//               name="name"
//               value={formData.name}
//               onChange={hanelFormData}
//             />
//           </div>
//           <div>
//             <label>Email</label>
//             <input
//               type="text"
//               placeholder="email"
//               required
//               name="email"
//               value={formData.email}
//               onChange={hanelFormData}
//             />
//           </div>
//           <div>
//             <label>PhoneNumber</label>

//             <input
//               type="text"
//               placeholder="phoneNumber"
//               required
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={hanelFormData}
//             />
//           </div>

//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Male"
//                 checked={formData.gender === "Male"}
//                 onChange={hanelFormData}
//               />
//               Male
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Female"
//                 checked={formData.gender === "Female"}
//                 onChange={hanelFormData}
//               />
//               Female
//             </label>
//           </div>

//           <div>
//             {hobbiesList.map((hobby) => (
//               <div key={hobby}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value={hobby}
//                     onChange={handelCheckBox}
//                   />
//                   {hobby}
//                 </label>
//               </div>
//             ))}
//           </div>

//           <button type="submit">Submit Form</button>
//         </form>
//       </div>

//       <div className="flex justify-center items-center ">
//         <form
//           onSubmit={handelSubmit}
//           className="bg-white shadow-lg p-6 rounded-lg w-full"
//         >
//           <h2 className="text-center text-xl font-semibold mb-4">
//             Employee Form
//           </h2>

//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               placeholder="Enter Name"
//               name="name"
//               value={empData.name}
//               onChange={empDataChange}
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               name="email"
//               value={empData.email}
//               onChange={empDataChange}
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               placeholder="Enter Phone Number"
//               name="phoneNumber"
//               value={empData.phoneNumber}
//               onChange={empDataChange}
//               className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
//           >
//             Submit Form
//           </button>
//         </form>
//       </div>

//       <div>
//         <h1>
//           Name : {user.name} Age : {user.age}
//         </h1>
//         <div className="flex gap-5">
//           <Button variant="contained" color="primary" onClick={updateUser}>
//             Increment
//           </Button>
//           <Button variant="contained" color="secondary" onClick={decrement}>
//             Decrement
//           </Button>
//         </div>
//       </div>

//       <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         onClose={() => setOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         sx={{ top: "70px !important" }}
//       >
//         <Alert
//           onClose={() => setOpen(false)}
//           severity="warning"
//           variant="filled"
//         >
//           Age cannot be less than 1!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };
