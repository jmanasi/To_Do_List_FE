// Home.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import { Task } from '../types';
import { Box, Typography, Button } from '@mui/material';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);
  

  const fetchTasks = async () => {
    axios.get<Task[]>('http://localhost:5000/api/tasks')
    .then(response => {
      console.log('fetchTasks response',response);
      
      setTasks(response.data)}
    )
    .catch(error => console.error('Error fetching tasks:', error));
  };

  const handleDelete =  (id: number) => {   
    const Id={id};
     
    axios.post<Task[]>(`http://localhost:5000/api/tasks/deleteTask`,Id)
    .then(response => {
      console.log('delete task-->',response);
      
      setTasks(response.data)
    })
    .catch(error => console.error('Error adding task:', error));
  };

  return (
    
    <Box p={3}>
    <Typography variant="h4" gutterBottom>To-Do List</Typography>
    <TaskList tasks={tasks} onDelete={handleDelete} />
  </Box>
  );
};

export default Home;
