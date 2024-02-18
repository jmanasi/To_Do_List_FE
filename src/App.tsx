import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import AddTask from './components/AddTask';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
      <Route path="/" element={<Home />} /> {/* Use element prop to specify component */}
      <Route path="/add-task" element={<AddTask />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;


