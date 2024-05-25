import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { AddTask } from './components/AddTask';
import UpdateTask from './components/UpdateTask';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/updateTask/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
};

export default App;
