import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';

import About from './components/About';
import Home from './components/Home';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/> 
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home key="Home" showAlert={showAlert}/>
          </Route>
          <Route exact path="/about">
            <About key="About"/> </Route> 
            <Route exact path="/login">
            <Login  key="Login" showAlert={showAlert}/></Route> 
            <Route exact path="/signup">
            <Signup  key="Signup" showAlert={showAlert}/>
          </Route> 
        </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;