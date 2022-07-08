import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Employees from './pages/employees/employee';
import Teams from './pages/teams/team';
import Projects from './pages/projects/project';


function App() {


  return (

    <Router>
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route index element={<Projects />} />
          <Route path="/home/projects" element={<Projects />} />
        </Route>
        <Route path="/employees" element={<Employees />} />
        <Route path="/home/teams" element={<Teams />} />
      </Routes>
    </Router>


  );
}

export default App;
