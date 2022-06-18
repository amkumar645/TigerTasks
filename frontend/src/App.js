import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Browse from './components/Tasks/Browse/Browse';
import Login from './components/Login/Login';
import MyTasks from './components/Tasks/MyTasks/MyTasks';
import Tutorial from './components/Tasks/Tutorial/Tutorial';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/mytasks" element={<MyTasks />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
