import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/home";
import Employees from "./pages/employees/employee";
import Teams from "./pages/teams/team";
import Projects from "./pages/projects/project";
// import SideBar from './components/sidebar/sidebar';
import KPIS from "./pages/kpi/kpi";
import Login from "./pages/login/login";
import Dashboard from "./pages/Dashboard";
import EmployeeProfile from "./pages/Employee profile/employeeProfile";
import Roles from "./pages/Roles/roles";
import Admin from "./pages/Admins/Admin";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route index path="" element={<Home />} />
          <Route path="" element={<Dashboard />}>
            <Route path="employees" element={<Employees />} />
            <Route path="employees/id=:id" element={<EmployeeProfile />} />
            <Route path="projects" element={<Projects />} />
            <Route path="kpis" element={<KPIS />} />
            <Route path="teams" element={<Teams />} />
            <Route path="admin" element={<Admin />} />
            <Route path="roles" element={<Roles />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
