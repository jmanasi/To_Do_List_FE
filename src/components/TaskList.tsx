import React, { useState } from 'react';
import { Task } from '../types';
import { Box, Card, CardContent, CardActions, Button, Typography, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Alert } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  const [searchTerm, setSearchTerm] = useState('');

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
      axios.put(`${process.env.REACT_APP_BASE_URL}/api/tasks`, updatedTask)
        .then(response => {
          setEditDialogOpen(false);
          setSuccess(true);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error updating task:', error);
          setEditDialogOpen(false);
          setError(true);
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
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredTasks = tasks.filter(task => {
    return task.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
    <Box sx={{ m: 10, flex: 1 }}>
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
        <TextField
          label="Search Tasks by Name"
          variant="outlined"
          onChange={handleSearchChange}
          // fullWidth
          sx={{ mt: 2 ,width:'70%'}}
        />
      </Box>
      <Grid container spacing={2}>
        {filteredTasks?.map(task => (
          
          <Grid item key={task.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ flex: '1 0 auto' }}>
                <Paper sx={{ backgroundColor: 'lightblue', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
                  <AssignmentIcon sx={{ marginRight: 1 }} />
                  <Typography variant="h5" component="div">
                    {task.name}
                  </Typography>
                </Paper>
                <Paper sx={{ backgroundColor: '#f0f0f0', padding: 2,  marginBottom: 1 }}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1px'}}>
                {task.status =='In progress' ? <CloudSyncIcon sx={{ marginRight: 1 }} /> :
                task.status=='Complete' ? <CheckCircleIcon sx={{ marginRight: 1 }} /> :
                <NewReleasesIcon sx={{ marginRight: 1 }} />
                }
                <Typography  >
                  <strong>Status:</strong> {task.status}
                </Typography> 
                </div>

                <Typography sx={{ mb: 1 }} >
                  <strong>Description:</strong> {task.description}
                </Typography>
                </Paper>

              </CardContent>
              <CardActions>
                <div style={{ margin: 'auto',width:'65%', display:'flex',justifyContent:'space-around'}}>
                  {task.status != 'Complete' &&
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleEditClick(task.id)}>
                    Edit
                  </Button>}
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(task.id)}>
                    Delete
                  </Button>
                </div>
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
