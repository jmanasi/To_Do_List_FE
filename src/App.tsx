import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom';
import Home from './components/Home';
import AddTask from './components/AddTask';
import './App.css'; // Import the CSS file
import { AppBar, Toolbar, Button } from '@mui/material';

function App() {
  return (
    <Router>
      <div className="App">
      <AppBar position="static">
          <Toolbar>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/add-task" color="inherit">
              Add Task
            </Button>
          </Toolbar>
        </AppBar>
      <Routes>
      <Route path="/" element={<Home />} /> {/* Use element prop to specify component */}
      <Route path="/add-task" element={<AddTask />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;


