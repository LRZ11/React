import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}