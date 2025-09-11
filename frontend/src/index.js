import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './component/signup/Signup';
import SignIn from './component/signIn/SignIn'
import MarketingPage from './component/home/MarketingPage';
import AppAppBar from './component/home/components/AppAppBar';
import ProfilePage from './component/profile/ProfilePage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MarketingPage/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/dashboard" element={<ProfilePage />} />
    </Routes>
   
  </BrowserRouter>
);