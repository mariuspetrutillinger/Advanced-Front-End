import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import './backend/FirebaseConfig.ts';
import Home from './pages/Home.tsx';
import Main from './pages/Main.tsx';
import Login from './components/Login.tsx';
import Signup from './components/Signup.tsx';
import Cursor from './components/Cursor.tsx';

function App() {
  return (
    <div className='app'>
      <Cursor />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;