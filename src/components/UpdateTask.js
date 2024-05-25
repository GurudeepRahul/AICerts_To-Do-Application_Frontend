import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Container,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

const UpdateTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/tasks/${id}`);
        if (response.data.success) {
          const task = response.data.task;
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
          setDueDate(task.dueDate);
        } else {
          setAlertType('error');
          setAlertMessage('Failed to fetch task data');
          setOpen(true);
        }
      } catch (error) {
        setAlertType('error');
        setAlertMessage('An error occurred while fetching task data');
        setOpen(true);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8081/tasks/${id}`, {
        title,
        description,
        status,
        dueDate
      });

      if (response.data.success) {
        navigate('/');
      } else {
        setAlertType('error');
        setAlertMessage(response.data.message || 'Failed to update task');
        setOpen(true);
      }
    } catch (error) {
      setAlertType('error');
      setAlertMessage('An error occurred');
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Task
        </Typography>
        <Button variant="contained" color="primary" onClick={handleBack}>
          Back
        </Button>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Due Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default UpdateTask;