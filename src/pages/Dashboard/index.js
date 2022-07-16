import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../../components/sidebar/sidebar';
import './index.css';


const Dashboard = () => {
  const navigate = useNavigate();
  const redirect = () => {
    if (!localStorage.token) {
      navigate('/login')
    }
  };
  redirect();

  return (
    <div className='dash-container'>
      {/* <SideBar /> */}
      <Outlet />
    </div>
  )
}

export default Dashboard
