import React, {useContext} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import HomePage from './Pages/HomePage';
import "./main.css"
import {myContext} from './Components/Context';
import PowerLines from './Components/PowerLines/PowerLines';
import Portfolio from './Components/Portfolio/Portfolio';

function App() {
  const {user} = useContext(myContext)

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
