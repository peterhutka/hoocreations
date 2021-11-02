import React, {useContext} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import "./main.css"
import {myContext} from './Components/Context';
import Register from './Pages/Register';
import {PrivateRoute} from './Components/PrivateRoute';
import ProtectedTest2 from './Components/ProtectedTest2';
import PowerLines from './Components/PowerLines/PowerLines';
import OnlyPublicRoute  from './Components/OnlyPublicRoute';
import Portfolio from './Components/Portfolio/Portfolio';

function App() {
  const {user} = useContext(myContext)
  console.log("App rendering **************")
    
  return (
    <>
      <Router>
        <Switch>
          
          <Route path="/" exact component={HomePage} />  
          <Route path="/powerlines" component={PowerLines} />
          <Route path="/portfolio" component={Portfolio} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
