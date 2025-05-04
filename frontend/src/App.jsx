

import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useAuthStore } from './store/useAuthStore';

import { Home, Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar';

import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from './pages/ProfilePage';
import { useEffect } from 'react';

function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }
  ,[checkAuth]);
  console.log({authUser});  

  return (
    <>
  
    <div>
      <Navbar/>
      
        <Routes>
          <Route path='/' element={authUser ? <HomePage/> : <Navigate to= "/login"/>} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
    </div>
      </>
  )
}

export default App
