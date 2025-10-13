import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import AssetsList from "./components/ListAssets";
import LoginForm from "./components/login/Login";
import { AuthContext } from './context/AuthContext';
import EditAssets from './components/edit/EditAssets';

function App() {
  return (
    <>
        <BrowserRouter> 
            <Routes>
                <Route index path="/" element={<AssetsList />} /> 
                <Route path="/edit/" element={<EditAssets />} />
                <Route path="/edit/:id" element={<EditAssets />} />
                <Route path="*" element={<h1>404: Página no encontrada</h1>} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;