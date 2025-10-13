import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import EditAssets from "./components/EditAssets";
import AssetsList from "./components/ListAssets";
import LoginForm from "./components/Login";

function App() {
  return (
    <>
        <BrowserRouter> 
            <Routes>
                <Route index path="/" element={<AssetsList />} /> 
                <Route path="/edit/:id" element={<EditAssets />} />
                <Route path="*" element={<h1>404: Página no encontrada</h1>} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;