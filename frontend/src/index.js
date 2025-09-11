import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './component/signup/Signup';
import SignIn from './component/signIn/SignIn'
import MarketingPage from './component/home/MarketingPage';
import AppAppBar from './component/home/components/AppAppBar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MarketingPage/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
    </Routes>
   
  </BrowserRouter>
);