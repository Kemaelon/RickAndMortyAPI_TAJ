import React from 'react';
import MainPage from './pages/MainPage'; 



import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CharsDetail from './pages/CharsDetails'; // Your second file

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/character/:id" element={<CharsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}