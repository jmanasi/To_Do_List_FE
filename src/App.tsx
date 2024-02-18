import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom';
import Home from './components/Home';
import AddTask from './components/AddTask';
import './App.css'; // Import the CSS file
import { AppBar, Toolbar, Button } from '@mui/material';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Router>
      <div className="App">

<AppBar position="static" 
// sx={{ bgcolor: 'lightblue' }}
>
          <Toolbar color="inherit">
            <Button onClick={toggleDrawer} color="inherit">
              <MenuIcon />
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              bgcolor: '#1976d2',
            },
          }}
        >
          <List>
            <ListItem button component={Link} to="/" onClick={toggleDrawer}>
              <ListItemText primary="Home"   primaryTypographyProps={{ style: { fontWeight: 'bold', color: 'white' } }}/>
            </ListItem>
            <ListItem button component={Link} to="/add-task" onClick={toggleDrawer}>
              <ListItemText primary="Add Task"   primaryTypographyProps={{ style: { fontWeight: 'bold', color: 'white' } }}/>
            </ListItem>
          </List>
        </Drawer>
      <Routes>
      <Route path="/" element={<Home />} /> {/* Use element prop to specify component */}
      <Route path="/add-task" element={<AddTask />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;


