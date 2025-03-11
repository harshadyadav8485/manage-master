import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProjectPost } from "./ProjectPost";
import { useNavigate } from "react-router-dom";

export const Project = () => {
  const [projectData, setProjectData] = useState([]);

  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/project/v1?pageNo=1&recordsPerPage=10`
      );
      console.log("response", response);
      setProjectData(response.data.data.projectResponseDtoList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate("/projectCreate");
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <>
      <h1>Projects</h1>
      <div className="flex justify-end">
        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: "white",
            color: "black",
            ":hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          Create Project
        </Button>
      </div>

      {projectData.map((project, index) => (
        <>
          <h1>{project.projectName}</h1>
          <h3>{project.projectDescription}</h3>
          <br />
        </>
      ))}
    </>
  );
};
