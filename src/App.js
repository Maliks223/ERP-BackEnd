import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Employees from './pages/employees/employee';
import Teams from './pages/teams/team';
import Projects from './pages/projects/project';
import SideBar from './components/sidebar/sidebar';
import KPIS from './pages/kpi/kpi';
import EmployeeProfile from './pages/Employee profile/employeeProfile';
import Roles from './pages/Roles/roles';
function App() {

  return (
    <>
      <Router>
        <SideBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/id=:employeeId" element={<EmployeeProfile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/kpis" element={<KPIS />} />
          <Route path="/teams" element={<Teams />} />
          <Route path='/roles' element={<Roles />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
