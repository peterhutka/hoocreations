import "../../main.css"
import { BrowserRouter as Router, Switch, Route, useRouteMatch, } from "react-router-dom"
import LeaderBoard from './LeaderBoard';
import HomePowerLines from './HomePowerLines';
import PowerlinesLogin from "./functions/PowerlinesLogin";
import PowerlinesRegister from "./PowerlinesRegister";

export default function PowerLines() {
    
    let match = useRouteMatch();

    return (
        <>
            <Route path={`${match.path}/register`} >
                <PowerlinesRegister />
            </Route>
            <Route path={`${match.path}/leaderboard`} >
                <LeaderBoard />
            </Route>  
            <Route path={`${match.path}/login`} >
                <PowerlinesLogin />
            </Route> 
            <Route path="/powerlines" >
                <HomePowerLines />
            </Route>  
            
        </>
    )
}


