import React, { useState } from 'react';
import { Task } from '../types';
import {Box, Card, CardContent, CardActions, Button, Typography, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem,Alert } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onDelete }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
  const [taskIdToEdit, setTaskIdToEdit] = useState<number | null>(null);
  const [updatedTaskName, setUpdatedTaskName] = useState('');
  const [updatedTaskStatus, setUpdatedTaskStatus] = useState('');
  const [updatedTaskDescription, setUpdatedTaskDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleDeleteClick = (taskId: number) => {
    setTaskIdToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (taskId: number) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setTaskIdToEdit(taskId);
      setUpdatedTaskName(taskToEdit.name);
      setUpdatedTaskStatus(taskToEdit.status);
      setUpdatedTaskDescription(taskToEdit.description);
      setEditDialogOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (taskIdToDelete !== null) {
      onDelete(taskIdToDelete);
      setTaskIdToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setTaskIdToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleEditConfirm = () => {
    if (taskIdToEdit !== null) {
      const updatedTask: Task = {
        id: taskIdToEdit,
        name: updatedTaskName,
        status: updatedTaskStatus,
        description: updatedTaskDescription
      };
      axios.put(`http://localhost:5000/api/tasks`, updatedTask)
        .then(response => {
          console.log('Task updated successfully:', response.data);
          setEditDialogOpen(false);
          setSuccess(true)
          window.location.reload()

        })
        .catch(error => {
          console.error('Error updating task:', error);
          setEditDialogOpen(false);
          setError(true)
        });
    }

};


  const handleEditCancel = () => {
    setTaskIdToEdit(null);
    setEditDialogOpen(false);
  };
  const handleCloseSuccessAlert = () => {
    setSuccess(false);
  };

  const handleCloseErrorAlert = () => {
    setError(false);
  };
  return (
    <>
    <Box sx={{ m:10, flex: 1 }}>
{success && (
          <Alert variant="filled" severity="success" sx={{ mt: 2, }}
          onClose={handleCloseSuccessAlert}
          >
            Task added successfully!
          </Alert>
        )}
        {error && (
          <Alert variant="filled" severity="error" sx={{ mt: 2, }}
          onClose={handleCloseErrorAlert}
          >
            Error adding task. Please try again later.
          </Alert>
        )}
</Box>
      <Grid container spacing={2}>
        {tasks?.map(task => (
          <Grid item key={task.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ flex: '1 0 auto' }}>
                <Paper sx={{ backgroundColor: 'lightblue', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
                  <AssignmentIcon sx={{ marginRight: 1 }} />
                  <Typography variant="h5" component="div">
                    {task.name}
                  </Typography>
                </Paper>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                  <strong>Status:</strong> {task.status}
                </Typography>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                  Description: {task.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleEditClick(task.id)}>
                  Edit
                </Button>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(task.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleEditCancel}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
            fullWidth
            disabled={true}
            margin="normal"
          />
          <TextField
            select
            label="Status"
            value={updatedTaskStatus}
            onChange={(e) => setUpdatedTaskStatus(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Incomplete">Incomplete</MenuItem>
            <MenuItem value="In progress">In Progress</MenuItem>
            <MenuItem value="Complete">Complete</MenuItem>
          </TextField>
          <TextField
            label="Description"
            value={updatedTaskDescription}
            onChange={(e) => setUpdatedTaskDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="primary">Cancel</Button>
          <Button onClick={handleEditConfirm} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
