import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "subTaskName", label: "Subtask Name", minWidth: 150 },
  { id: "taskName", label: "Task Name", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "userName", label: "User Name", minWidth: 150 },
  { id: "reporterName", label: "Reporter Name", minWidth: 150 },
  { id: "budgetedHours", label: "Budgeted Hours", minWidth: 120 },
  { id: "actualHours", label: "Actual Hours", minWidth: 120 },
  { id: "startDate", label: "Start Date", minWidth: 120 },
  { id: "endDate", label: "End Date", minWidth: 120 },
  { id: "sprintName", label: "Sprint Name", minWidth: 150 },
  { id: "projectName", label: "Project Name", minWidth: 150 },
];

export default function StickyHeadTable() {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/subtask/v1?pageNo=${
          page + 1
        }&recordsPerPage=${rowsPerPage}`
      );

      setData(response.data.data.subTaskListResponseDtos || []);
      setTotalRecords(response.data.data.totalRecords || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {row[column.id] ? row[column.id] : "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Paper>
  );
}
