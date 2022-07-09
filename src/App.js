import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Employees from './pages/employees/employee';
import Teams from './pages/teams/team';
import Projects from './pages/projects/project';
import Kpis from './pages/kpi/kpi';
import SideBar from './components/sidebar/sidebar';
function App() {

  return (
    <>
   

    <Router>
    <SideBar/>

      <Routes>
      
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/kpis" element={<Kpis />} />

        <Route path="/teams" element={<Teams />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
