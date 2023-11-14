import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import './App.css';

// Components
import SetNickname from './setNickname/setNickname';
import NewProfile from './NewProfile/NewProfile';
import Form from './Form/Form';
import Bienvenue from './Bienvenue/Bienvenue'; // Assurez-vous que le chemin d'importation est correct

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Bienvenue />} />
        <Route path="/Bienvenue" element={<Bienvenue />} />
        <Route path="/setNickname" element={<SetNickname />} />
        <Route path="/newprofile" element={<NewProfile />} />
        <Route path="/Form" element={<Form />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
