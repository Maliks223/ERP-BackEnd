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
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="" element={<Dashboard />}>
            <Route index path="home" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/id=:id" element={<EmployeeProfile />} />
            <Route path="projects" element={<Projects />} />
            <Route path="kpis" element={<KPIS />} />
            <Route path="teams" element={<Teams />} />
            <Route path="roles" element={<Roles />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
