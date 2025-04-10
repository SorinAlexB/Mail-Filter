import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Sign from './Sign.jsx'
import Form from './Form.jsx'
import ResetPass from './ResetPass.jsx'
import Success from './Success.jsx'
import Dashboard from './Dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Sign/>}/>
      <Route path="/form" element={<Form/>}/>
      <Route path="/reset" element={<ResetPass/>}/>
      <Route path="/success" element={<Success/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
