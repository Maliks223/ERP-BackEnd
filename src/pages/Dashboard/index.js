import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../../components/sidebar/sidebar';
import './index.css';
import NavBar from '../../components/navbar/navbar';


const Dashboard = () => {
  const navigate = useNavigate();

  const redirect = () => {
    if (!localStorage.token) {
      navigate('/login')
    }
  };

  useEffect(() => {
    redirect();
  }, []);

  return (
    <div className='dash-container'>
      <NavBar />
      <SideBar />
      <Outlet />
    </div>
  )
}

export default Dashboard
