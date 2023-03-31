import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Result from './pages/Result';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
          <Route path="result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
