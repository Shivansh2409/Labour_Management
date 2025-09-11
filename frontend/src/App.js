import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './component/signup/Signup';
import SignIn from './component/signIn/SignIn'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<SignUp/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
    </Routes>
   
  </BrowserRouter>
);