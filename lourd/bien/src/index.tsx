import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Bienvenue from './Bienvenue/';
/* import SetNickname from './SetNickname';
import NewProfile from './NewProfile';
import Form from './Form' */

console.log("LOURD");

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
<React.StrictMode>
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bienvenue />} />
  {/*         <Route path="/Bienvenue" element={<Bienvenue />} />
          <Route path="/setNickname" element={<SetNickname />} />
          <Route path="/newprofile" element={<NewProfile />} />
          <Route path="/Form" element={<Form />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  </BrowserRouter>
</React.StrictMode>
);