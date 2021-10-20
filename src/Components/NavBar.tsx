import axios, { AxiosResponse } from 'axios'
import React, {useContext} from 'react'
import { Link, useHistory } from "react-router-dom"
import { myContext } from './Context'


export default function NavBar() {
    const history = useHistory();
    const {user, updateUser} = useContext(myContext)

    //Logout
    const logout = () => {
        axios.get("http://localhost:8080/logout", {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if(res.data === "logged out") {
                updateUser()
                history.push("/login")
            }
        })
    }
    
    return (
        <div className="NavContainer">
            <Link to="/"> Home </Link> 
            <Link to="/protectedtest2"> Protected2</Link>
            {user ? (
                <>
                    <Link to="/logout" onClick={logout}> Logout </Link>
                    {user.isAdmin ? (<Link to="/admin"> Admin </Link>) : null }
                    <Link to="/profile"> Profile </Link>
                </>
            ): (
                <>
                    <Link to="/login"> Login </Link>
                    <Link to="/register"> Register </Link>
                </>
            )}
                  
        </div>
    )
}
