import React, { useState } from 'react';
import axios from 'axios';
import { Task } from '../types';
import { Box, Typography, TextField, Button,Container,Paper, CircularProgress, Alert,Select, MenuItem,  } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const AddTaskForm: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const handleSubmit = async () => {
    setLoading(true);
  
    try {
     
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newTask: Task = { id: 0, name, status,description };

      const response = await axios.post<Task>(`${process.env.REACT_APP_BASE_URL}/api/tasks`, newTask);

      setName('');
      setStatus('');
      setDescription('')
      setLoading(false);
      setSuccess(true);
      
    } catch (error) {
      console.error('Error adding task:', error);
      setLoading(false);
      setError(true);
    }
  };

  const handleCloseSuccessAlert = () => {
    setSuccess(false);
  };

  const handleCloseErrorAlert = () => {
    setError(false);
  };
  return (
<Box 
sx={ { m: 1 ,justifySelf:'center'} }
>
<Typography variant="h4" >Add Task</Typography>
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
<Box sx={{ m:1, flex: 1 }}>
<Paper elevation={3} sx={{ padding: 2, m:10, backgroundColor:'ffedec' }}>
<Container 

maxWidth="sm">

<FormControl 
fullWidth 
variant="standard"
>

  <TextField
  id="input-with-icon-textfield"
  label="Add Task Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AssignmentIcon />
      </InputAdornment>
    ),
  }}
  variant="standard"
  sx={{ m: 1 }}
/>

            <FormControl fullWidth variant="standard">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as string)}
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <RuleOutlinedIcon />
                    </InputAdornment>
                  }
                  sx={{ m: 1 }}
                >
                  <MenuItem value="Incomplete">Incomplete</MenuItem>
                  <MenuItem value="In progress">In Progress</MenuItem>
                  <MenuItem value="Complete">Complete</MenuItem>
                </Select>
              </FormControl>
<TextField
  id="input-with-icon-textfield"
  label="Add Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  required
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <DescriptionOutlinedIcon />
      </InputAdornment>
    ),
  }}
  variant="standard"
  sx={{ m: 1 }}
/>
     <Button 
     style={{marginTop:'20px'}}
     type="submit" variant="contained" color="primary"
       onClick={handleSubmit}
       disabled={loading || status=="" ||name==""||description==""} 
     >
       {loading ? <CircularProgress size={24} /> : 'Add Task'}
  </Button>
</FormControl>
</Container>
</Paper>


</Box>
</Box>
  );
};

export default AddTaskForm;
