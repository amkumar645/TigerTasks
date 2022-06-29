import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Browse from './components/Tasks/Browse/Browse';
import Login from './components/Login/Login';
import MyTasks from './components/Tasks/MyTasks/MyTasks';
import Tutorial from './components/Tasks/Tutorial/Tutorial';
import { useState } from 'react';
import RequestedTasks from './components/Tasks/RequestedTasks/RequestedTasks';

function App() {
  const [user, setUser] = useState({
    "name": "",
    "netID": "", 
    "email": "", 
  });

  const setCurrentUser = (currentUser) => {
    setUser({
      "name": currentUser[0],
      "netID": currentUser[1], 
      "email": currentUser[2],
    });
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse user={user}/>} />
        <Route path="/mytasks" element={<MyTasks user={user}/>} />
        <Route path="/wantedtasks" element={<RequestedTasks user={user}/>} />
        <Route path="/tutorial" element={<Tutorial user={user}/>} />
        <Route path="/login" element={<Login setUser={setCurrentUser}/>} />
      </Routes>
    </Router>
  );
}

export default App;
