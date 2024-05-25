import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/addTask");
  };

  const handleUpdateClick = (taskId) => {
    navigate(`/updateTask/${taskId}`);
  };

  const handleDeleteClick = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8081/tasks/${taskId}`);
      setTasks( tasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError("An error occurred while deleting the task");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8081/tasks");

        if (response.data.success) {
          setTasks(response.data.tasks);
        } else {
          setError("Failed to fetch tasks");
        }
      } catch (error) {
        setError("An error occurred while fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Box sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        To Do Application
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add
      </Button>
      {loading ? (
        <Typography variant="h6" component="h2" gutterBottom>
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="h6" component="h2" color="error" gutterBottom>
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateClick(task.id)}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(task.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default HomePage;
