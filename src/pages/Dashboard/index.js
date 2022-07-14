import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/sidebar/sidebar'

const Dashboard = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  )
}

export default Dashboard
