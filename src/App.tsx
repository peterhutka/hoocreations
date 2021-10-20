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

function App() {
  const {user} = useContext(myContext)
  console.log("App rendering **************")
    
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path="/protectedtest2" component={ProtectedTest2}/>
          <Route path="/" exact component={HomePage} />  
          <Route path="/powerlines" component={PowerLines} />
          <OnlyPublicRoute path="/login" component={Login}/>
          
          {
            user ? (
              <>
                {user.isAdmin ? (<Route path="/admin" exact component={AdminPage} />) : null}              
                <Route path="/profile" exact component={Profile} />
            </>
          ) : (
            <>
            
            <Route path="/register" exact component={Register} />
            </>
          )
          }          
        </Switch>
      </Router>

    </>
  );
}

export default App;
