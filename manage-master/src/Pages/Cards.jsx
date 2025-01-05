import React, { useState } from "react";

export const Cards = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    subscribe: false,
    state: "",
    district: "",
    address: {
      city: "",
      pincode: "",
    },
    contacts: [],
    projects: [],
    hobbies: [],
  });

  const genderData = ["MALE", "FEMALE"];
  const stateData = ["MAHARASHTRA", "GUJARAT", "DELHI", "PUNJAB", "RAJASTHAN"];
  const districtData = ["SATARA", "PUNE", "KARAD"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleAddContact = () => {
    setFormData((prev) => ({
      ...prev,
      contacts: [
        ...prev.contacts,
        {
          email: "",
          phone: "",
        },
      ],
    }));
  };

  const handleAddProject = (e) => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          projectName: "",
        },
      ],
    }));
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = formData.contacts.map((contact, i) =>
      i === index ? { ...contact, [field]: value } : contact
    );
    setFormData((prev) => ({ ...prev, contacts: updatedContacts }));
  };

  const handelProjectChange = (index, field, value) => {
    const updateProjects = formData.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );

    setFormData((prev) => ({ ...prev, projects: updateProjects }));
  };

  const handleDeleteContact = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      contacts: prevState.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleAddHobbies = (e) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: [
        ...prev.hobbies,
        {
          hobbyName: "",
          hobbyDescription: "",
        },
      ],
    }));
  };

  const handelHobbiesChange = (index, field, value) => {
    const hobbiesArray = formData.hobbies.map((hobbie, i) =>
      i === index ? { ...hobbie, [field]: value } : hobbie
    );

    setFormData((prev) => ({ ...prev, hobbies: hobbiesArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", JSON.stringify(formData, null, 2));
  };

  return (
    <div className="px-6 py-6 bg-white">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full gap-4">
          <div className="flex-1 pb-4">
            <label className="block pb-2">Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex-1 pb-4">
            <label className="block pb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="block w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select a gender</option>
              {genderData.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex-1 pb-4">
            <label className="block pb-2">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="block w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select a state</option>
              {stateData.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 pb-4">
            <label className="block pb-2">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="block w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select a district</option>
              {districtData.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex-1 pb-4">
            <label className="block pb-2">City</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="block w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex-1 pb-4">
            <label className="block pb-2">Pincode</label>
            <input
              type="text"
              placeholder="Pincode"
              name="pincode"
              value={formData.address.pincode}
              onChange={handleAddressChange}
              className="block w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        <div>
          {formData.contacts.map((contact, index) => (
            <div className="flex w-full gap-4 pb-4" key={index}>
              <div className="flex-1">
                <label className="block pb-2">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={(e) =>
                    handleContactChange(index, "email", e.target.value)
                  }
                  className="block w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block pb-2">Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  value={contact.phone}
                  onChange={(e) =>
                    handleContactChange(index, "phone", e.target.value)
                  }
                  className="block w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleDeleteContact(index)}
                  className="bg-red-500 p-2 text-white  rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="block w-full text-center text-black text-sm border border-gray-300 p-2 rounded mb-4"
          onClick={handleAddContact}
        >
          Add Contact
        </button>

        <div>
          {formData.projects.map((project, index) => (
            <div className="flex w-full gap-4 pb-4" key={index}>
              <div className="flex-1">
                <label className="block pb-2">Project</label>
                <input
                  type="text"
                  placeholder="project"
                  name="projectName"
                  value={project.projectName}
                  onChange={(e) =>
                    handelProjectChange(index, "projectName", e.target.value)
                  }
                  className="block w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="block w-full text-center text-black text-sm border border-gray-300 p-2 rounded mb-4"
          onClick={handleAddProject}
        >
          Add Projects
        </button>

        <div>
          {formData.hobbies.map((hobbie, index) => (
            <div className="flex w-full gap-4 pb-4" key={index}>
              <div className="flex-1">
                <label className="block pb-2">hobbyName</label>
                <input
                  type="text"
                  name="hobbyName"
                  value={hobbie.hobbyName}
                  className="block w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    handelHobbiesChange(index, "hobbyName", e.target.value)
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block pb-2">hobbyDescription</label>
                <input
                  type="text"
                  name="hobbyDescription"
                  value={hobbie.hobbyDescription}
                  className="block w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    handelHobbiesChange(
                      index,
                      "hobbyDescription",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/*Add hobbies*/}
        <button
          type="button"
          className="block w-full text-center text-black text-sm border border-gray-300 p-2 rounded mb-4"
          onClick={handleAddHobbies}
        >
          Add Hobbies
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="block w-full bg-blue-500 text-white text-center p-2 rounded"
        >
          Submit Details
        </button>
      </form>
    </div>
  );
};
