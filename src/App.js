import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Setup from './Timer-setup'; // Assuming you have a home component
import Timer from './Timer'; // Import the Timer component
import './styles/App.module.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Setup />} />
          
          {/* Timer route */}
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
