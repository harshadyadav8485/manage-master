import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Epic = () => {
  const [epicData, setEpicData] = useState([]);

  //   const fetchEpic = async () => {
  //     const response = await axios.get(``);
  //   };
  //   useEffect(() => {
  //     fetchEpic();
  //   }, []);

  return (
    <>
      <div>
        <div className="flex justify-end">
          <Link to="/addEpic">
            <Button className="bg-black text-white">Add Epic</Button>
          </Link>
        </div>
        <table>
          <tr>
            <td>ID</td>
            <td>Name</td>
          </tr>
        </table>
      </div>
    </>
  );
};
