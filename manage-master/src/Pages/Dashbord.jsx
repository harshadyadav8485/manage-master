import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const API_URL = "https://jsonplaceholder.typicode.com/users"; // Replace with your API

const Dashboard = () => {
  const [cardData, setCardData] = useState([]); // Stores API data for cards
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null); // Track clicked card
  const [tableData, setTableData] = useState([]); // Stores table data

  // Fetch API Data for Cards
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setCardData(response.data.slice(0, 4)); // Limit to 4 cards
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Handle Card Click to Fetch Table Data
  const handleCardClick = (card) => {
    setSelectedCard(card);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${card.id}`) // Example API for table data
      .then((response) => {
        setTableData(response.data.slice(0, 5)); // Limit rows
      })
      .catch((error) => console.error("Error fetching table data:", error));
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Cards Section */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {cardData.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.id}>
              <Card
                sx={{
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: 3,
                }}
                onClick={() => handleCardClick(card)}
              >
                <CardContent>
                  <Typography variant="h6">{card.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Table Section - Only Show if a Card is Selected */}
      {selectedCard && (
        <div style={{ marginTop: 30 }}>
          <Typography variant="h5" gutterBottom>
            {selectedCard.name}'s Data
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableData.length > 0 &&
                    Object.keys(tableData[0])
                      .slice(0, 3)
                      .map((key, index) => (
                        <TableCell key={index}>{key.toUpperCase()}</TableCell>
                      ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(row)
                      .slice(0, 3)
                      .map((value, colIndex) => (
                        <TableCell key={colIndex}>{value}</TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
