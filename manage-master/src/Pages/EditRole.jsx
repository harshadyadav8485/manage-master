import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditRole = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();
  console.log(roleId);

  const [roleData, setRoleData] = useState({
    roleId: null,
    roleName: "",
    description: "",
    status: "",
  });

  const statuss = ["ACTIVE", "INACTIVE"];

  const fetchRole = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/role/v1?pageNo=1&recordsPerPage=1000&role_id=${roleId}`
      );
      const role = response.data.data.roleListResponseDtos[0];
      if (role) {
        setRoleData({
          roleId: role.roleId,
          roleName: role.roleName,
          description: role.description,
          status: role.status,
        });
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:9090/role/v1", roleData);
      alert("Role updated successfully!");
      navigate("/role");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Please try again.");
    }
  };

  useEffect(() => {
    if (roleId) {
      fetchRole();
    }
  }, [roleId]);

  return (
    <>
      <div>
        <h1>Edit Role</h1>
        <div>
          <form onSubmit={handelSubmit}>
            <lable>RoleName</lable>
            <input
              type="text"
              placeholder="Name"
              name="roleName"
              value={roleData.roleName}
              onChange={handelChange}
            />

            <lable>Description</lable>
            <input
              type="text"
              placeholder="description"
              name="description"
              value={roleData.description}
              onChange={handelChange}
            />

            <lable>Status</lable>
            <select
              name="status"
              value={roleData.status}
              onChange={handelChange}
            >
              {statuss.map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
