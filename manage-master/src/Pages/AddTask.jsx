import { useState } from "react";

export const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    taskId: null,
    name: "",
    description: "",
    sprintId: null,
    projectId: null,
    status: "",
    priority: "",
    taskType: "",
    userId: null,
    epicId: null,
  });

  const statusData = [
    "TO_DO",
    "IN_PROGRESS",
    "DEV_COMPLETED",
    "UAT_COMPLETED",
    "DEPLOYED",
    "CLOSED",
  ];

  const priorities = ["LOW", "MEDIUM", "HIGH"];

  const handelChange = (e) => {
    const { name, value } = e.target;
    console.log("Changing:", name, value);
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Task Data:", taskData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name</label>
          <input
            type="text"
            name="name"
            value={taskData.name}
            placeholder="Enter Task Name"
            onChange={handelChange}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={taskData.description}
            placeholder="Enter Task Description"
            onChange={handelChange}
          />
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={taskData.status} onChange={handelChange}>
            <option value="">Select a status</option>
            {statusData.map((statusD, index) => (
              <option key={index} value={statusD}>
                {statusD}
              </option>
            ))}
          </select>
        </div>

        <div>
          <lable>Priority</lable>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handelChange}
          >
            <option value="">Select a priority</option>
            {priorities.map((p, index) => (
              <option key={index} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
