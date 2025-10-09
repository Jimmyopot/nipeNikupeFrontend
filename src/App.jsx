import './App.css';
import { Routes, Route } from "react-router-dom";
import IndexPage from './pages/landingPage/IndexPage';
import SignUpPage from './pages/signUp/SignUpPage';
import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthAction } from './pages/login/state/LoginActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App
