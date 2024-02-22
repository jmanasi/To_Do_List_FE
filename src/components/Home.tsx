// Home.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import { Task } from '../types';
import { Box, Typography ,Alert} from '@mui/material';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {    
    fetchTasks();
  }, []);
  

  const fetchTasks = async () => {
    axios.get<Task[]>(`${process.env.REACT_APP_BASE_URL}/api/tasks`)
    .then(response => {
      
      setTasks(response.data)}
    )
    .catch(error => console.error('Error fetching tasks:', error));
  };

  const handleDelete =  (id: number) => {   
    const Id={id};
     
    axios.post<Task[]>(`${process.env.REACT_APP_BASE_URL}/api/tasks/deleteTask`,Id)
    .then(response => {
      
      setTasks(response.data)
    })
    .catch(error => console.error('Error adding task:', error));
  };

  return (
    <Box p={3}>
    <Typography variant="h4" gutterBottom>
      To-Do List
    </Typography>
    {tasks.length === 0 ? (
      <Alert severity="info">
        No tasks listed. Go to add task to add a new task.
      </Alert>
    ) : (
      <TaskList tasks={tasks} onDelete={handleDelete} />
    )}
  </Box>
  );
};

export default Home;
