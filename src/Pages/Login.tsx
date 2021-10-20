import axios, { AxiosResponse } from 'axios'
import React, { useContext, useState} from 'react'
import { useHistory } from 'react-router'
import { myContext } from '../Components/Context'
import NavBar from '../Components/NavBar'



const Login = (props: any) => {
    const [username, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    let history = useHistory()
    const {updateUser} = useContext(myContext)

    const style = props.style || ""

    const login = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        axios.post("http://localhost:8080/login", {
            username,
            password
        }, {
            withCredentials: true
        }).then((res : AxiosResponse) => {
            if (res.data === "success"){
                updateUser({
                    from: "/login",
                    to: props?.location?.state?.from
                }, history) 
            } 
        }, ()=>{
           console.error("login failed") 
        })
    }

    return (
        <div className={style}>
            <NavBar/>
            <h1>Login</h1>
            <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)} />
            <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={e => login(e)}>Login</button>  
        </div>
    )
}

export default Login
